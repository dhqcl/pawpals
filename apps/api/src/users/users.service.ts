import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneByEmailWithPassword(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'username', 'email', 'password_hash', 'avatar_url', 'created_at'],
        });
    }

    async findOneById(id: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }
}
