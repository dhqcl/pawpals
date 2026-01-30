import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @Column('simple-array', { nullable: true })
    media_urls: string[];

    @Column({ nullable: true })
    location: string;

    @Column({ default: 0 })
    like_count: number;

    @Column({ default: 0 })
    comment_count: number;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'author_id' })
    author: UserEntity;

    @Column()
    authorId: string;

    @CreateDateColumn()
    created_at: Date;
}
