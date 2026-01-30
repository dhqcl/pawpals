import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { LikeEntity } from './like.entity';
import { CommentEntity } from './comment.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, LikeEntity, CommentEntity])],
    providers: [PostsService],
    controllers: [PostsController],
    exports: [PostsService],
})
export class PostsModule { }
