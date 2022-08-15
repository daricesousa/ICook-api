import { json, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Params } from "../utils/params";
import { Ingredient } from "../models/ingredient";
import { GroupIngredients } from "../models/modelGroupIngredients";


class ControllerIngredient {


  async create(req: Request, res: Response) {
    try {
      const fields = Params.required(req.body, ['name', 'group']);
      if (fields) return res.status(433).json({ message: "Campos inválidos", campos: fields })

      const { name, id, group, associates } = req.body;
      const repository = getRepository(Ingredient);
      const groupRepository = getRepository(GroupIngredients);

      const groupField = await groupRepository.findOne({ id: group });
      if (!groupField) {
        return res.status(403).json({
          message: "Grupo não encontrado",
        });
      }

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

  async listIngredients(req: Request, res: Response) {
    try {
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
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no servidor" })

    }
  }


  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const repository = getRepository(Ingredient);
      const deleted = await repository.delete({ id: Number(id) })
      if (deleted.affected === 0) {
        return res.status(404).json({ message: "ingrediente não encontrado" })
      }
      return res.json({ message: "ingrediente deletado" })
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "erro interno",
      });
    }
  }

  async updateAssociate(req: Request, res: Response) {
    try {
      const fields = Params.required(req.body, ['id', 'associates']);
      if (fields) return res.status(433).json({ message: "Campos inválidos", campos: fields })

      const { id, associates } = req.body;
      const repository = getRepository(Ingredient);
      let ingredient = await repository.findOne({id});
      
      if (!ingredient) {
        return res.status(403).json({
          message: "Ingrediente não cadastrado",
        });
      }
      ingredient.associates = JSON.stringify(associates)
      await repository.update({id: id}, ingredient)
      return res.json({
        "message": "lista de associação alterada"
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

export { ControllerIngredient };
