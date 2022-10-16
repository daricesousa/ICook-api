import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { MyReq } from "../interfaces/myReq";
import { Ingredient } from "../models/ingredient";
import { Recipe, IIngredient, IAvaliation } from "../models/modelRecipe";
import { User } from "../models/modelUser";
import { Params } from "../utils/params";
import { identifyUser } from "../utils/response401";

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

            const repositoryRecipe = getRepository(Recipe);
            const show = req.query.show
            let filter = { valid: true }

            if (req.user && req.user.rule == 'admin') {
                if (show == 'invalid') filter.valid = false
                if (show == 'all') filter = {} as any
            }
            const repositoryUser = getRepository(User);
            const [recipes] = await repositoryRecipe.findAndCount(filter);
            const [users] = await repositoryUser.findAndCount();
            res.json({
                message: 'sucesso',
                data: {
                    recipes: recipes.map((recipe) => {
                        let userRating = -1
                        if (req?.user?.id) {
                            userRating = recipe.avaliated(req?.user?.id)
                        }
                        const user =  users.find((user) => user.id == recipe.creator);
                        let nameCreator = ''
                        if(user){
                            nameCreator = user.name
                        }

                        return {
                            ...recipe,
                            avaliations: undefined,
                            avaliation: {
                                user_rating: userRating,
                                quantity: recipe.avaliations.list.length,
                                rating_average: recipe.sumAvaliations()/recipe.avaliations.list.length,
                            },
                            name_creator: nameCreator,
                        }
                    }),
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



    async newAvaliation(req: MyReq, res: Response) {
        try {
            const fields = Params.required(req.body, ['recipe', 'rating']);
            if (fields) return res.status(433).json({ message: "Campos inválidos", campos: fields })

            const { recipe, rating } = req.body;
            const repository = getRepository(Recipe);
            const recipeFind = await repository.findOne({ id: recipe });

            if (!recipeFind) {
                return res.status(403).json({
                    message: "Receita não encontrada",
                });
            }

            const index = (recipeFind.avaliations.list as IAvaliation[]).findIndex((e) => e.user == req.user.id)

            if (index != -1) {
                recipeFind.avaliations.list[index].rating = rating;
            }
            else {
                recipeFind.avaliations.list.push({
                    user: req.user.id,
                    rating: rating
                })
            }

            await repository.update({ id: recipeFind.id }, recipeFind)
            return res.json({
                "message": "Avaliação realizada"
            })

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "erro interno",
            });
        }
    }
}

export { ControllerRecipe };