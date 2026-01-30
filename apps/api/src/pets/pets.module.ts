import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PetEntity])],
    providers: [PetsService],
    controllers: [PetsController],
    exports: [PetsService],
})
export class PetsModule { }
