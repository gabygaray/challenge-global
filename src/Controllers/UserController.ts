import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from '../Services/UserService';
import CreateUserRequest from '../Models/Request/User/CreateUserRequest';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';
import UpdateUserRequest from '../Models/Request/User/UpdateUserRequest';
import { GetUserResponse } from '../Models/Response/User/GetUserResponse';
import {
    createUserResponse,
    listUsersResponse,
    findUserByIdResponse,
    updateUserByIdResponse,
    deleteUserByIdResponse,
} from '../Models/Response/User/SwaggerResponse';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiBody({ type: CreateUserRequest })
    @ApiResponse(createUserResponse)
    async createUser(@Body() createUserRequest: CreateUserRequest): Promise<SuccessfulResponse> {
        return this._userService.createUser(createUserRequest);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los usuarios' })
    @ApiResponse(listUsersResponse)
    async listUsers(): Promise<GetUserResponse[]> {
        return this._userService.listUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Encontrar un usuario por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'User ID' })
    @ApiResponse(findUserByIdResponse)
    async findUserById(@Param('id') id: number): Promise<GetUserResponse> {
        return this._userService.findUserById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar usuario por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'User ID' })
    @ApiBody({ type: UpdateUserRequest })
    @ApiResponse(updateUserByIdResponse)
    async updateUserById(@Param('id') id: number, @Body() updateUserRequest: UpdateUserRequest): Promise<SuccessfulResponse> {
        return this._userService.updateUserById(id, updateUserRequest);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiParam({ name: 'id', type: Number, description: 'User ID' })
    @ApiResponse(deleteUserByIdResponse)
    async deleteUserById(@Param('id') id: number): Promise<SuccessfulResponse> {
        return this._userService.deleteUserById(id);
    }
}
