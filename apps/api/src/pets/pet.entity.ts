import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { BreedEntity } from '../wiki/breed.entity';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

@Entity('pets')
export class PetEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nickname: string;

    @Column({ nullable: true })
    avatar_url: string;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    @Column({ type: 'date' })
    birthday: Date;

    @Column({ default: false })
    is_neutered: boolean;

    @Column('jsonb', { nullable: true })
    metadata: Record<string, any>;

    @ManyToOne(() => UserEntity, (user) => user.pets)
    @JoinColumn({ name: 'owner_id' })
    owner: UserEntity;

    @Column()
    ownerId: string;

    @ManyToOne(() => BreedEntity)
    @JoinColumn({ name: 'breed_id' })
    breed: BreedEntity;

    @Column({ nullable: true })
    breedId: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
