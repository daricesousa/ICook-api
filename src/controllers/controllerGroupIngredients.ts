import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Params } from "../utils/params";
import { GroupIngredients } from "../models/modelGroupIngredients";

class ControllerGroupIngredients {
  async create(req: Request, res: Response) {
    try {
      const fields = Params.required(req.body, ['name']);
      if (fields) return res.status(433).json({ message: "Campos inválidos", campos: fields })

      const { name, id} = req.body;
      const repository = getRepository(GroupIngredients);

      const group = repository.create({
        name: name,
        id: id,
      });

      await repository.save(group);
      return res.json({
        message: "grupo criado",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "erro interno",
      });
    }
  }

  async listGroups (req: Request, res: Response) {
    try{
      const repository = getRepository(GroupIngredients);
      const groups = await repository.find();
      res.json({
        message: 'sucesso',
        data: {
          groups: groups.map((group) => {
            return {
              ...group,
              created_at: undefined
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

export { ControllerGroupIngredients };
