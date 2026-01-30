import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { WikiService } from './wiki.service';

@Controller('wiki')
export class WikiController {
    constructor(private wikiService: WikiService) { }

    @Get('breeds')
    async findAll() {
        return this.wikiService.findAll();
    }

    @Get('breeds/:id')
    async findOne(@Param('id') id: string) {
        const breed = await this.wikiService.findOne(id);
        if (!breed) {
            throw new NotFoundException('Breed not found');
        }
        return breed;
    }
}
