import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

// site para consultar o typeorm
// https://typeorm.io/entities

@Entity('user') // "user" é o nome da tabela
class User {
  @PrimaryGeneratedColumn()
  readonly id: number;   // "readonly" é como se fosse o "final do Dart"

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  valid_sign: Date;

  @CreateDateColumn()
  readonly created_at: Date;
}

export { User }