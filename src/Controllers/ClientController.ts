import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import Response from '../Helpers/Formatter/Response';
import { ClientService } from '../Services/ClientService';
import CreateClientRequest from '../Models/Request/Client/CreateClientRequest';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';

@Controller('clients')
export class ClientController {
    constructor(private readonly _clientService: ClientService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createClient(@Body() client: CreateClientRequest): Promise<Response<SuccessfulResponse>> {
        const response = await this._clientService.createClient(client);
        return Response.create<SuccessfulResponse>(response);
    }
}
