import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { LikeEntity } from './like.entity';
import { CommentEntity } from './comment.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        @InjectRepository(LikeEntity)
        private likesRepository: Repository<LikeEntity>,
        @InjectRepository(CommentEntity)
        private commentsRepository: Repository<CommentEntity>,
    ) { }

    async create(data: Partial<PostEntity>): Promise<PostEntity> {
        const post = this.postsRepository.create(data);
        return this.postsRepository.save(post);
    }

    async findAll(page: number = 1, limit: number = 10, userId?: string): Promise<{ data: any[]; total: number }> {
        const [posts, total] = await this.postsRepository.findAndCount({
            order: { created_at: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
            relations: ['author'],
        });

        // Check if user liked posts
        const data = await Promise.all(posts.map(async (post) => {
            let isLiked = false;
            if (userId) {
                const count = await this.likesRepository.count({ where: { postId: post.id, userId } });
                isLiked = count > 0;
            }
            return { ...post, isLiked };
        }));

        return { data, total };
    }

    async findOne(id: string): Promise<PostEntity | null> {
        return this.postsRepository.findOne({
            where: { id },
            relations: ['author'],
        });
    }

    async delete(id: string, userId: string): Promise<void> {
        const post = await this.findOne(id);
        if (!post) throw new NotFoundException('Post not found');
        if (post.authorId !== userId) throw new NotFoundException('Not authorized');

        await this.postsRepository.delete(id);
    }

    async like(postId: string, userId: string): Promise<void> {
        const existing = await this.likesRepository.findOne({ where: { postId, userId } });
        if (existing) {
            await this.likesRepository.remove(existing);
            await this.postsRepository.decrement({ id: postId }, 'like_count', 1);
        } else {
            const like = this.likesRepository.create({ postId, userId });
            await this.likesRepository.save(like);
            await this.postsRepository.increment({ id: postId }, 'like_count', 1);
        }
    }

    async comment(postId: string, userId: string, content: string): Promise<CommentEntity> {
        const comment = this.commentsRepository.create({ postId, authorId: userId, content });
        await this.commentsRepository.save(comment);
        await this.postsRepository.increment({ id: postId }, 'comment_count', 1);
        const newComment = await this.commentsRepository.findOne({ where: { id: comment.id }, relations: ['author'] });
        if (!newComment) throw new Error('Comment creation failed');
        return newComment;
    }

    async getComments(postId: string): Promise<CommentEntity[]> {
        return this.commentsRepository.find({
            where: { postId },
            order: { created_at: 'ASC' },
            relations: ['author'],
        });
    }
}
