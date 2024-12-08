import { Injectable } from '@nestjs/common';
import { UserDao } from '../Daos/UserDao';
import { User } from '../Models/Entities/UserEntity';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';
import CreateUserRequest from 'src/Models/Request/User/CreateUserRequest';
import HttpCustomException from 'src/Exceptions/HttpCustomException';
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import { UserProfileDao } from 'src/Daos/UserProfileDao';
import UpdateUserRequest from 'src/Models/Request/User/UpdateUserRequest';
import { GetUserResponse } from 'src/Models/Response/User/GetUserResponse';

@Injectable()
export class UserService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _userProfileDao: UserProfileDao,
    ) {}

    // Método para crear un nuevo usuario y su perfil
    async createUser(user: CreateUserRequest): Promise<SuccessfulResponse> {
        // Verificar si el usuario ya existe por correo electrónico o nombre
        const existingUser = await this._userDao.findByEmail(user.email);
        if (existingUser) {
            throw new HttpCustomException('Ya existe un usuario con este correo', StatusCodeEnums.USER_ALREADY_EXISTS);
        }

        // Verificar si el perfil de usuario existe
        const existingUserProfile = await this._userProfileDao.findByCode(user.profileCode);
        if (!existingUserProfile) {
            throw new HttpCustomException('Perfil de usuario no encontrado', StatusCodeEnums.USER_PROFILE_NOT_FOUND);
        }

        // Crear una nueva instancia de User y asignar valores
        const newUser: User = new User();
        newUser.setName(user.name);
        newUser.setEmail(user.email);
        newUser.setAge(user.age);

        // Establecer la relación entre User y UserProfile
        newUser.setProfile(existingUserProfile);

        // Guardar el usuario con su perfil en la base de datos
        await this._userDao.create(newUser);

        return new SuccessfulResponse('Usuario creado correctamente');
    }

    // Método para obtener la lista de usuarios
    async listUsers(): Promise<GetUserResponse[]> {
        const users = await this._userDao.listUsers();
        const result: GetUserResponse[] = [];

        users.forEach((user) => {
            result.push(new GetUserResponse(user));
        });

        if (result.length === 0) {
            throw new HttpCustomException('No se encontraron usuarios', StatusCodeEnums.USER_NOT_FOUND);
        }

        return result;
    }

    // Método para obtener los detalles de un usuario por su ID
    async findUserById(id: number): Promise<GetUserResponse> {
        const user = await this._userDao.findById(id);
        if (!user) {
            throw new HttpCustomException('Usuario no encontrado', StatusCodeEnums.USER_NOT_FOUND);
        }

        return new GetUserResponse(user);
    }

    // Método para actualizar la información de un usuario por su ID
    async updateUserById(id: number, user: UpdateUserRequest): Promise<SuccessfulResponse> {
        // Verificar si el ID del usuario es válido
        if (!id) {
            throw new HttpCustomException('Debe proporcionar un ID de usuario', StatusCodeEnums.INVALID_REQUEST);
        }
        // Verificar si el usuario existe
        const existingUser = await this._userDao.findById(id);
        if (!existingUser) {
            // Lanzar una excepción si el usuario no se encuentra
            throw new HttpCustomException('Usuario no encontrado', StatusCodeEnums.USER_NOT_FOUND);
        }
        // Verificar si se proporcionó al menos un campo para actualizar
        if (!user.name && !user.email && !user.age && !user.profileCode) {
            throw new HttpCustomException('Debe proporcionar al menos un campo para actualizar', StatusCodeEnums.INVALID_REQUEST);
        }

        // Actualizar los valores del usuario
        if (user.name) {
            existingUser.setName(user.name);
        }
        if (user.email) {
            existingUser.setEmail(user.email);
        }
        if (user.age) {
            existingUser.setAge(user.age);
        }
        if (user.profileCode) {
            // Verificar si el perfil de usuario existe
            const existingUserProfile = await this._userProfileDao.findByCode(user.profileCode);
            if (!existingUserProfile) {
                throw new HttpCustomException('Perfil de usuario no encontrado', StatusCodeEnums.USER_PROFILE_NOT_FOUND);
            }
            existingUser.setProfile(existingUserProfile);
        }

        // Guardar los cambios en la base de datos
        await this._userDao.update(existingUser);

        return new SuccessfulResponse('Usuario actualizado correctamente');
    }

    // Método para eliminar un usuario por su ID
    async deleteUserById(id: number): Promise<SuccessfulResponse> {
        // Verificar si el ID del usuario es válido
        if (!id) {
            throw new HttpCustomException('Debe proporcionar un ID de usuario', StatusCodeEnums.INVALID_REQUEST);
        }
        // Verificar si el usuario existe
        const existingUser = await this._userDao.findById(id);
        if (!existingUser) {
            // Lanzar una excepción si el usuario no se encuentra
            throw new HttpCustomException('Usuario no encontrado', StatusCodeEnums.USER_NOT_FOUND);
        }

        await this._userDao.deleteById(id);
        return new SuccessfulResponse('Usuario eliminado correctamente');
    }
}
