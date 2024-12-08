import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../Models/Entities/UserProfileEntity';

@Injectable()
export class UserProfileDao {
    constructor(@InjectRepository(UserProfile) private readonly _userProfileRepository: Repository<UserProfile>) {}

    async create(user: UserProfile): Promise<UserProfile> {
        return this._userProfileRepository.save(user);
    }

    async update(user: UserProfile): Promise<UserProfile> {
        return this._userProfileRepository.save(user);
    }

    async deleteById(id: number): Promise<void> {
        await this._userProfileRepository.delete(id);
    }

    async findById(id: number): Promise<UserProfile> {
        const query = this._userProfileRepository.createQueryBuilder('user_profile').where('user_profile.id = :id', { id: id }).getOne();
        if (!query) {
            return null;
        }

        return query;
    }

    async findByCode(code: string) {
        const query = this._userProfileRepository.createQueryBuilder('user_profile').where('user_profile.code = :code', { code: code }).getOne();
        if (!query) {
            return null;
        }
        return query;
    }
}
