import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreedEntity } from './breed.entity';
import * as breedsData from '../seeds/breeds.json';

@Injectable()
export class WikiService implements OnModuleInit {
    constructor(
        @InjectRepository(BreedEntity)
        private breedsRepository: Repository<BreedEntity>,
    ) { }

    async onModuleInit() {
        await this.seedBreeds();
    }

    async seedBreeds() {
        const count = await this.breedsRepository.count();
        if (count > 0) {
            console.log('Breeds already seeded.');
            return;
        }

        console.log('Seeding breeds...');
        // Type assertion or mapping if needed, assuming JSON matches entity loosely
        const breeds = breedsData as Partial<BreedEntity>[];
        await this.breedsRepository.save(breeds);
        console.log(`Seeded ${breeds.length} breeds.`);
    }

    async findAll(): Promise<BreedEntity[]> {
        return this.breedsRepository.find();
    }

    async findOne(id: string): Promise<BreedEntity | null> {
        return this.breedsRepository.findOne({ where: { id } });
    }
}
