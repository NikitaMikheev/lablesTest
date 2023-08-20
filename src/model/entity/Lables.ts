import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Entities } from "./Entities";

// таблица lables
@Entity()
export class Lables {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' }) // строка (например, label1)
    text: string 

    @ManyToMany(() => Entities) //  many to many (lable-entity), формирует дополнительную третью таблицу со связями
    @JoinTable()
    entities: Entities[]

}