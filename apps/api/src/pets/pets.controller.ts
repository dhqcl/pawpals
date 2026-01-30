import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PetsService } from './pets.service';

@Controller('pets')
@UseGuards(AuthGuard('jwt'))
export class PetsController {
    constructor(private petsService: PetsService) { }

    @Post()
    async create(@Request() req: any, @Body() body: any) {
        return this.petsService.create({
            ...body,
            ownerId: req.user.userId,
        });
    }

    @Get()
    async findAll(@Request() req: any) {
        return this.petsService.findAllByOwner(req.user.userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.petsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.petsService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.petsService.delete(id);
    }
}
