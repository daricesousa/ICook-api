import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('recipe')
class Recipe {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column("simple-json")
  ingredients: { list: IIngredient[] };
  //lista de map com o id do ingrediente e a quantidade

  @Column("simple-array", {default:[]})
  method: string[]; //modo de preparo

  @Column({ default: 1 })
  difficulty: number;

  @Column({ default: '11-30 min'})
  time_setup: string

  @Column({ default: '11-30 min'})
  time_cooking: string

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

  @Column({ default: false })
  picture_ilustration: boolean;

  public avaliated(userId: Number): number {
    let userAvaliated = -1;
    this.avaliations.list.forEach((e) => {
      if (e.user === userId) {
        userAvaliated = e.rating
        return
      }
    })
    return userAvaliated;
  }

  public sumAvaliations(): number {
    let sum = 0;
    this.avaliations.list.forEach((e) => {
      sum+= e.rating;
    })
    return sum;
  }
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


