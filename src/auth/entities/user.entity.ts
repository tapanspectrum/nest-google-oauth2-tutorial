import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    displayName: string

    @Column()
    picture: string

    @Column({
        default: true
    })
    isActive: boolean
}
