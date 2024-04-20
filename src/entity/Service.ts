import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Generated,
  PrimaryColumn,
} from "typeorm";
import { BuisnessUser } from "./User";
import { Interface } from "readline";

@Entity()
export class Service {
  @ManyToOne(() => BuisnessUser)
  @JoinColumn()
  buisness: BuisnessUser;
  @Column()
  buisnessUserId: number;

  @PrimaryGeneratedColumn("uuid")
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
