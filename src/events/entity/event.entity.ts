import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  type: string;

  @Index()
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "json" })
  payload: Record<string, any>;
}
