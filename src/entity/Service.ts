import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Interface } from "readline";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price?: number;

  @Column()
  city_id: number;

  @Column({ default: 0 })
  rating: number;
}
