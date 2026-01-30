import { Controller, Get, Param, Put, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import type { UpdateUserDto } from '@petverse/shared';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getMe(@Request() req: any) {
        const user = await this.usersService.findOneById(req.user.userId);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('me')
    async updateMe(@Request() req: any, @Body() body: UpdateUserDto) {
        return this.usersService.update(req.user.userId, body);
    }

    @Get(':username')
    async getProfile(@Param('username') username: string) {
        const user = await this.usersService.findOneByUsername(username);
        if (!user) throw new NotFoundException('User not found');
        // Sanitize sensitive info if any (though entity should handle it)
        return user;
    }
}
