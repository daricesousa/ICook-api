import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('recipe')
class Recipe {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column("simple-json")
  ingredients: { list: IIngredient[] };
  //lista de map com o id do ingrediente e a quantidadade

  @Column("simple-array", {default:[]})
  method: string[]; //modo de preparo

  @Column({ default: "médio" })
  difficulty: string;

  @Column()
  creator: number; //id do usuário que criou

  @Column({ default: false })
  valid: boolean;

  @Column("simple-json")
  avaliations: { list: IAvaliation[] }; //lista de map dos usuários que avaliaram e sua nota


  @CreateDateColumn()
  readonly created_at: Date;

  @Column()
  picture: string; //foto
}

interface IIngredient {
  id: number;
  quantity: number;
  measurer: string;
}

interface IAvaliation {
  user: number;
  rating: number;
}

export { Recipe, IIngredient, IAvaliation }


