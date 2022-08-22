import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { MyReq } from "../interfaces/myReq";
import { Ingredient } from "../models/ingredient";
import { Recipe, IIngredient } from "../models/modelRecipe";
import { Params } from "../utils/params";

class ControllerRecipe {
    async create(req: MyReq, res: Response) {
        try {
            const fields = Params.required(req.body, ['title', 'ingredients', 'method', 'picture']);
            if (fields) return res.status(433).json({ message: "Campos inválidos", campos: fields })

            const { title, ingredients, method, picture, difficulty } = req.body;

            const recipeRepository = getRepository(Recipe);
            const ingredientRepository = getRepository(Ingredient);

            let message = ""
            for await (let e of ingredients.list) {
                if (!e.id || !e.quantity || !e.measurer) {
                    message = "Lista de ingredientes invalida"
                    break
                }
                if (e.id) {
                    const existIngredient = await ingredientRepository.findOne({ id: e.id })
                    if (!existIngredient) {
                        message = `Ingrediente com id ${e.id} não existe`
                        break
                    }
                }
            }
            if (message) return res.status(433).json({ message })
            const recipe = recipeRepository.create({
                title: title,
                picture: picture,
                ingredients: ingredients,
                method: method,
                difficulty: difficulty,
                creator: req.user.id,
                avaliations: { "list": [] },
                valid: req.user.rule == 'admin',
            });

            await recipeRepository.save(recipe);
            return res.json({
                message: "receita criada",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "erro interno",
            });
        }
    }

    async listRecipes(req: MyReq, res: Response) {

        try {
            const repository = getRepository(Recipe);
            const show = req.query.show
            let filter = { valid: true }

            if (req.user && req.user.rule == 'admin') {
                if (show == 'invalid') filter.valid = false
                if (show == 'all') filter = {} as any
            }

            const [recipes] = await repository.findAndCount(filter);

            res.json({
                message: 'sucesso',
                data: {
                    recipes: recipes
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro no servidor" })

        }
    }


    async validateRecipe(req: Request, res: Response) {
        try {
            const fields = Params.required(req.body, ['id', 'accept']);
            if (fields) {
                return res.status(433).json({ message: "Campos inválidos", campos: fields });
            } const { id, accept } = req.body;
            const repository = getRepository(Recipe);
            const recipe = await repository.findOne({ id });
            if (!recipe) {
                return res.status(404).json({ message: "Receita não encontrada" });
            }
            if (accept == true) {
                await repository.update({ id }, { valid: true })
                return res.status(201).json({ message: "Receita cadastrada" });
            }
            if (accept == false) {
                await repository.delete({ id: Number(id) })
                return res.status(200).json({ message: "Receita excluída" });
            }
            return res.status(433).json({ message: "Accept inválido" });

        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Erro interno" });

        }
    }

}

export { ControllerRecipe };