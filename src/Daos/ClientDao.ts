import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../Models/Entities/ClientEntity';

@Injectable()
export class ClientDao {
    constructor(@InjectRepository(Client) private readonly _clientRepository: Repository<Client>) {}

    async createClient(client: Client): Promise<Client> {
        return this._clientRepository.save(client);
    }

    async findClient(): Promise<Client> {
        return this._clientRepository.createQueryBuilder().getOne();
    }
}
