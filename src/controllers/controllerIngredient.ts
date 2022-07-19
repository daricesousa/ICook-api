import { json, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Params } from "../utils/params";
import { Ingredient } from "../models/ingredient";


class ControllerIngredient {
  

  async create(req: Request, res: Response) {
    try {
      const fields = Params.required(req.body, ['name', 'group']);
      if (fields) return res.status(433).json({ message: "Campos inválidos", campos: fields })

      const {name, id, group, associates} = req.body;
      const repository = getRepository(Ingredient);
      const ingredient = repository.create({
        name,
        id,
        group,
        associates: JSON.stringify(associates || []),
      });

      await repository.save(ingredient);
      return res.json({
        message: "ingrediente criado",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "erro interno",
      });
    }
  }

  async listIngredients (req: Request, res: Response) {
    try{
      const repository = getRepository(Ingredient);
      const ingredients = await repository.find();
      res.json({
        message: 'sucesso',
        data: {
          ingredients: ingredients.map((ingredient) => {
            return {
              ...ingredient,
              created_at: undefined,
              associates: JSON.parse(ingredient.associates)
            }
          }),
        }
      })
    }catch(error) {
      console.log(error);
      return res.status(500).json({message: "Erro no servidor"})
      
    }
  }

}

export {ControllerIngredient};
