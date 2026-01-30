import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Request() req: any, @Body() body: any) {
        return this.postsService.create({
            ...body,
            authorId: req.user.userId,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Request() req: any, @Query('page') page: string, @Query('limit') limit: string) {
        // Check for auth header manually or use a specific strategy that is optional?
        // For now, let's assume public feed but we want to check if user liked posts.
        // Making it public but parsing token if available is tricky with standard AuthGuard.
        // Let's make feed meaningful: If logged in, show likes.
        // For simplicity in MVP: Require Auth for Feed to see personalized state, or just pass userId if available.
        // Let's use a trick: Extract token if present.
        // Actually, simple solution: Use UseGuards(AuthGuard('jwt')) to require login for main feed for now,
        // or handle "Optional Auth" via custom decorator/guard.
        // Given the previous code used AuthGuard for everything in previous controllers, let's try to be consistent.
        // But Feed should be public?
        // Let's make Feed Public but if Authorization header exists, use it.
        // For now, let's just create a separate endpoint or just handle it in service if userId is passed.

        // To keep it simple: Public Feed, no "isLiked" yet unless we implement optional auth.
        // OR: Just require login for the main feed as it is a "Social" app.
        // Let's require login for now as per "PetVerse" being a social platform.

        // Wait, previous findAll implementation in controller didn't use @UseGuards.
        // So it was public.
        // I will add @UseGuards(AuthGuard('jwt')) to findAll to support userId extraction easily.
        // If we want public access, we'd need to mock or handle optional auth.
        // Let's go with Authenticated Feed for MVP (Simplifies "isLiked" logic).

        // Actually, let's try to get userId from request if it exists, but not enforce it.
        // Since I can't easily do optional auth without custom guard, I will just make it authenticated for now.
        // User asked for "Social Feed" which usually implies logged in context.
        return this.postsService.findAll(Number(page) || 1, Number(limit) || 10, req.user?.userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Request() req: any, @Param('id') id: string) {
        return this.postsService.delete(id, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/like')
    async like(@Request() req: any, @Param('id') id: string) {
        return this.postsService.like(id, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/comments')
    async comment(@Request() req: any, @Param('id') id: string, @Body() body: { content: string }) {
        return this.postsService.comment(id, req.user.userId, body.content);
    }

    @Get(':id/comments')
    async getComments(@Param('id') id: string) {
        return this.postsService.getComments(id);
    }
}
