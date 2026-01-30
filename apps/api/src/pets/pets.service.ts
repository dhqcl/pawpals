import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from './pet.entity';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetEntity)
        private petsRepository: Repository<PetEntity>,
    ) { }

    async create(data: Partial<PetEntity>): Promise<PetEntity> {
        const pet = this.petsRepository.create(data);
        return this.petsRepository.save(pet);
    }

    async findAllByOwner(ownerId: string): Promise<PetEntity[]> {
        return this.petsRepository.find({
            where: { ownerId },
            relations: ['breed'],
        });
    }

    async findOne(id: string): Promise<PetEntity | null> {
        return this.petsRepository.findOne({
            where: { id },
            relations: ['breed', 'owner'],
        });
    }

    async update(id: string, data: Partial<PetEntity>): Promise<PetEntity> {
        await this.petsRepository.update(id, data);
        const updated = await this.findOne(id);
        if (!updated) throw new NotFoundException('Pet not found');
        return updated;
    }

    async delete(id: string): Promise<void> {
        await this.petsRepository.delete(id);
    }
}
