import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Flavor } from "./flavor.entity";

/*
    We have 3 type of relations:

    - One to One
    - One to Many
    - Many to Many
*/

@Entity("coffees")
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  brand: string;

  @Column({ type: "integer", default: 0 })
  recommendations: number;

  @JoinTable({
    name: "coffees_flavors",
    joinColumn: {
      name: "coffee_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "flavor_id",
      referencedColumnName: "id"
    }
  })
  //* {cascade:true} ===> ["update", "insert", "remove", "soft-remove", "recover"] -
  //* when you do operation with coffee, it apply to favor too
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];
}
