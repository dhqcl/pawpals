import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum Species {
    DOG = 'DOG',
    CAT = 'CAT',
    OTHER = 'OTHER',
}

@Entity('breeds')
export class BreedEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: Species,
        default: Species.OTHER,
    })
    species: Species;

    @Column('text')
    description: string;

    @Column()
    example_image_url: string;

    @Column('jsonb')
    characteristics: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;
}
