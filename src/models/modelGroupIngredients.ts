import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('groupIngredients')
class GroupIngredients {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  readonly created_at: Date;
}

export {GroupIngredients }