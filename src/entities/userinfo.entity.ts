
import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id!:number;
    @Column({ nullable: false })
    rank: number;
    @Column({ nullable: false })
    user: string;
    @Column()
    bitrh: number;
    @Column()
    rating: number;
    @Column()
    highest: number;
    @Column()
    match: number;
    @Column()
    win: number;
}
