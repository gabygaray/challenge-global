import { ApiResponseOptions } from '@nestjs/swagger';
import SuccessfulResponse from '../SuccessfulResponse';
import { User } from '@src/Models/Entities/UserEntity';

export const createUserResponse: ApiResponseOptions = {
    status: 201,
    description: 'El usuario ha sido creado correctamente',
    type: SuccessfulResponse,
    examples: {
        example1: {
            summary: 'Ejemplo de respuesta exitosa',
            value: {
                message: 'Usuario creado correctamente',
            },
        },
    },
};

export const listUsersResponse: ApiResponseOptions = {
    status: 200,
    description: 'Lista de usuarios',
    type: [User],
    examples: {
        example1: {
            summary: 'Ejemplo de lista de usuarios',
            value: [
                {
                    id: 1,
                    name: 'Gabriel Garay',
                    email: 'gabygaray100@gmail.com',
                    age: 30,
                    profile: {
                        id: 1,
                        code: 'ADMIN',
                        name: 'Administrador',
                    },
                },
            ],
        },
    },
};

export const findUserByIdResponse: ApiResponseOptions = {
    status: 200,
    description: 'Usuario',
    type: User,
    examples: {
        example1: {
            summary: 'Ejemplo de usuario',
            value: {
                id: 1,
                name: 'Gabriel Garay',
                email: 'gabygaray100@gmail.com',
                age: 30,
                profile: {
                    id: 1,
                    code: 'ADMIN',
                    name: 'Administrador',
                },
            },
        },
    },
};

export const updateUserByIdResponse: ApiResponseOptions = {
    status: 200,
    description: 'El usuario ha sido correctamente actualizado',
    type: SuccessfulResponse,
    examples: {
        example1: {
            summary: 'Ejemplo de actualización de usuario',
            value: {
                message: 'Usuario actualizado correctamente',
            },
        },
    },
};

export const deleteUserByIdResponse: ApiResponseOptions = {
    status: 200,
    description: 'El usuario ha sido correctamente eliminado',
    type: SuccessfulResponse,
    examples: {
        example1: {
            summary: 'Ejemplo de eliminación de usuario',
            value: {
                message: 'Usuario eliminado correctamente',
            },
        },
    },
};
