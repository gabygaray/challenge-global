import { Injectable } from '@nestjs/common';
import { ClientDao } from '../Daos/ClientDao';
// import HttpCustomException from '../Exceptions/HttpCustomException';
import { Client } from '../Models/Entities/ClientEntity';
import CreateClientRequest from '../Models/Request/Client/CreateClientRequest';
// import { StatusCodeEnums } from '../Enums/StatusCodeEnums';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';

@Injectable()
export class ClientService {
    constructor(private readonly _clientDao: ClientDao) {}

    async createClient(client: CreateClientRequest): Promise<SuccessfulResponse> {
        // const findClient: Client = await this._clientDao.findClient();
        // if (findClient) throw new HttpCustomException('Client name already exists', StatusCodeEnums.CLIENT_NAME_ALREADY_EXISTS);

        const newClient: Client = new Client();
        newClient.setName(client.name);
        await this._clientDao.createClient(newClient);
        return new SuccessfulResponse('Client created successfully');
    }
}
