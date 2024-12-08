import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import Response from '../Helpers/Formatter/Response';
import { UserService } from '../Services/UserService';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';
import CreateUserRequest from 'src/Models/Request/User/CreateUserRequest';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: CreateUserRequest): Promise<Response<SuccessfulResponse>> {
        const response = await this._userService.createUser(user);
        return Response.create<SuccessfulResponse>(response);
    }
}
