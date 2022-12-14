import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, } from "typeorm";

export enum DreamTypes {
    NORMAL_DREAM = "normal dream",
    DAYDREAMS = "daydreams",
    LUCID_DREAMS = "lucid dreams",
    FALSE_AWAKENING_DREAMS = "false awakening dreams",
    NIGHTMARES = "nightmares",
}

@Entity('dream')
export class Dream extends BaseEntity {
    @PrimaryGeneratedColumn()
    dream_id: number;

    @Column("text")
    title: string;

    @Column({
        type: "enum",
        enum: DreamTypes,
        default: DreamTypes.NORMAL_DREAM,
    })
    dream_type: DreamTypes;

    @Column("text")
    description: string;

    @Column("date")
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}