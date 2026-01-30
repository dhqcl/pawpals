import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PostEntity } from './post.entity';

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'author_id' })
    author: UserEntity;

    @Column()
    authorId: string;

    @ManyToOne(() => PostEntity)
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;

    @Column()
    postId: string;

    @CreateDateColumn()
    created_at: Date;
}
