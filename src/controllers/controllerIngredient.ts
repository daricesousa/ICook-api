import { json, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Params } from "../utils/params";
import { Ingredient } from "../models/ingredient";
import { GroupIngredients } from "../models/modelGroupIngredients";
import { MyReq } from "../interfaces/myReq";


class ControllerIngredient {


  async create(req: MyReq, res: Response) {
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
        valid: req.user.rule == 'admin',
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

  async listIngredients(req: MyReq, res: Response) {
    try {
      const repository = getRepository(Ingredient);
      const show = req.query.show
      let filter = { valid: true }

      if (req.user && req.user.rule == 'admin') {
        if (show == 'invalid') filter.valid = false
        if (show == 'all') filter = {} as any
      }

      const [ingredients] = await repository.findAndCount(filter);
      res.json({
        message: 'sucesso',
        data: {
          ingredients: ingredients.map((ingredient) => {
            return {
              ...ingredient,
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
      const { id } = req.params;
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
      let ingredient = await repository.findOne({ id });

      if (!ingredient) {
        return res.status(403).json({
          message: "Ingrediente não cadastrado",
        });
      }
      ingredient.associates = JSON.stringify(associates)
      await repository.update({ id: id }, ingredient)
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

  async update(req: Request, res: Response) {
    try {
      const fields = Params.required(req.body, ['id']);
      if (fields) return res.status(433).json({ message: "Campos inválidos", campos: fields })

      const { id, name, group } = req.body;
      const repository = getRepository(Ingredient);
      let ingredient = await repository.findOne({ id });

      if (!ingredient) {
        return res.status(403).json({
          message: "Ingrediente não cadastrado",
        });
      }
      if(!name){
        ingredient.name = name
      }
      if(!group){
        const groupRepository = getRepository(GroupIngredients);
        const groupField = await groupRepository.findOne({ id: group });
        if (!groupField) {
          return res.status(403).json({
            message: "Grupo não encontrado",
          });
        }
        ingredient.group = group
      }
      await repository.update({ id: id }, ingredient)
      return res.json({
        "message": "ingrediente alterado"
      })

    }
    catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "erro interno",
      });
    }
  }

  async validateIngredient(req: Request, res: Response) {
    try {
      const fields = Params.required(req.body, ['id', 'accept']);
      if (fields) {
        return res.status(433).json({ message: "Campos inválidos", campos: fields });
      } const { id, accept } = req.body;
      const repository = getRepository(Ingredient);
      const ingredient = await repository.findOne({ id });
      if (!ingredient) {
        return res.status(404).json({ message: "Ingrediente não encontrado" });
      }
      if(accept == true){
        await repository.update({id}, {valid: true})
        return res.status(201).json({message: "Ingrediente cadastrado"});
      }
      if(accept == false){
        await repository.delete({id: Number(id)})
        return res.status(200).json({message: "Ingrediente excluído"});
      }
      return res.status(433).json({message: "Accept inválido"});

    }catch(e){
      console.log(e)
      return res.status(500).json({message: "Erro interno"});

    }
  }



}

export { ControllerIngredient };
