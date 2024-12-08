import { Injectable } from '@nestjs/common';
import { UserDao } from '../Daos/UserDao';
// import HttpCustomException from '../Exceptions/HttpCustomException';
import { User } from '../Models/Entities/UserEntity';
// import { StatusCodeEnums } from '../Enums/StatusCodeEnums';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';
import CreateUserRequest from 'src/Models/Request/User/CreateUserRequest';

@Injectable()
export class UserService {
    constructor(private readonly _userDao: UserDao) {}

    async createUser(user: CreateUserRequest): Promise<SuccessfulResponse> {
        // const findUser: User = await this._userDao.findUser();
        // if (findUser) throw new HttpCustomException('User name already exists', StatusCodeEnums.USER_NAME_ALREADY_EXISTS);

        const newUser: User = new User();
        newUser.setName(user.name);
        await this._userDao.createUser(newUser);
        return new SuccessfulResponse('User created successfully');
    }
}
