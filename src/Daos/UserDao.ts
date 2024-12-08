import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Models/Entities/UserEntity';

@Injectable()
export class UserDao {
    constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

    async create(user: User): Promise<User> {
        return this._userRepository.save(user);
    }

    async update(user: User): Promise<User> {
        return this._userRepository.save(user);
    }

    async deleteById(id: number): Promise<void> {
        await this._userRepository.delete(id);
    }

    async findById(id: number): Promise<User> {
        const query = await this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.profile', 'profile')
            .where('user.id = :id', { id: id })
            .getOne();
        if (!query) {
            return null;
        }

        return query;
    }

    async findByEmail(email: string): Promise<User> {
        const query = await this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.profile', 'profile')
            .where('user.email = :email', { email: email })
            .getOne();
        if (!query) {
            return null;
        }
        return query;
    }

    async findByName(name: string): Promise<User> {
        const query = await this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.profile', 'profile')
            .where('user.name = :name', { name: name })
            .getOne();
        if (!query) {
            return null;
        }
        return query;
    }

    async listUsers(): Promise<User[]> {
        const query = await this._userRepository.createQueryBuilder('user').innerJoinAndSelect('user.profile', 'profile').getMany();
        if (!query) {
            return [];
        }
        return query;
    }
}
