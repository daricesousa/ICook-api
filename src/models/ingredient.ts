import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingredient')
class Ingredient{
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column()
  group: number;
  
  @Column()
  associates: string;

  @Column({default: false})
  valid: boolean;

  @CreateDateColumn()
  readonly created_at: Date;
}

export {Ingredient}