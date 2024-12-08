import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Models/Entities/UserEntity';

@Injectable()
export class UserDao {
    constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

    async createUser(user: User): Promise<User> {
        return this._userRepository.save(user);
    }

    async findUser(): Promise<User> {
        return this._userRepository.createQueryBuilder().getOne();
    }
}
