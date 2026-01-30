import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PostEntity } from './post.entity';

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column()
    userId: string;

    @ManyToOne(() => PostEntity)
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;

    @Column()
    postId: string;

    @CreateDateColumn()
    created_at: Date;
}
