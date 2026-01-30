import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedEntity } from './breed.entity';
import { WikiService } from './wiki.service';
import { WikiController } from './wiki.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BreedEntity])],
    providers: [WikiService],
    controllers: [WikiController],
    exports: [WikiService],
})
export class WikiModule { }
