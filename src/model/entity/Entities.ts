import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";


// таблица entities
@Entity()
export class Entities {

    @PrimaryGeneratedColumn() // идентификатор сущности
    id: number

    @Column({ type: 'varchar'}) // тип сущности (пользователь, сайт или компания)
    type: string 

}