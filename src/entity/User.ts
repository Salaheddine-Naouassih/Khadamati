import Joi = require("joi");
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  rating: number;
}
@Entity()
export class BuisnessUser {
  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @PrimaryColumn()
  userId: number;

  @Column()
  contactNumber: string;

  @Column()
  address: string;
}
