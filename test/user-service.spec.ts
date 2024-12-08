import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@src/Services/UserService';
import { UserDao } from '@src/Daos/UserDao';
import { UserProfileDao } from '@src/Daos/UserProfileDao';
import { User } from '@src/Models/Entities/UserEntity';
import { UserProfile } from '@src/Models/Entities/UserProfileEntity';
import CreateUserRequest from '@src/Models/Request/User/CreateUserRequest';
import UpdateUserRequest from '@src/Models/Request/User/UpdateUserRequest';
import SuccessfulResponse from '@src/Models/Response/SuccessfulResponse';
import { GetUserResponse } from '@src/Models/Response/User/GetUserResponse';
import HttpCustomException from '@src/Exceptions/HttpCustomException';
import { StatusCodeEnums } from '@src/Enums/StatusCodeEnums';

describe('UserService', () => {
    let userService: UserService;
    let userDao: UserDao;
    let userProfileDao: UserProfileDao;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserDao,
                    useValue: {
                        findByEmail: jest.fn(),
                        create: jest.fn(),
                        listUsers: jest.fn(),
                        findById: jest.fn(),
                        update: jest.fn(),
                        deleteById: jest.fn(),
                    },
                },
                {
                    provide: UserProfileDao,
                    useValue: {
                        findByCode: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userDao = module.get<UserDao>(UserDao);
        userProfileDao = module.get<UserProfileDao>(UserProfileDao);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            const createUserRequest: CreateUserRequest = {
                name: 'John',
                email: 'john@example.com',
                age: 30,
                profileCode: 'ADMIN',
            };

            const userProfile: UserProfile = new UserProfile();
            jest.spyOn(userProfileDao, 'findByCode').mockResolvedValue(userProfile);
            jest.spyOn(userDao, 'findByEmail').mockResolvedValue(null);
            jest.spyOn(userDao, 'create').mockResolvedValue(new User());

            const result = await userService.createUser(createUserRequest);
            expect(result).toEqual(new SuccessfulResponse('Usuario creado correctamente'));
        });

        it('should throw an error if the user already exists', async () => {
            const createUserRequest: CreateUserRequest = {
                name: 'John',
                email: 'john@example.com',
                age: 30,
                profileCode: 'ADMIN',
            };

            const existingUser: User = new User();
            jest.spyOn(userDao, 'findByEmail').mockResolvedValue(existingUser);

            await expect(userService.createUser(createUserRequest)).rejects.toThrow(
                new HttpCustomException('Ya existe un usuario con este correo', StatusCodeEnums.USER_ALREADY_EXISTS),
            );
        });

        it('should throw an error if the user profile does not exist', async () => {
            const createUserRequest: CreateUserRequest = {
                name: 'John',
                email: 'john@example.com',
                age: 30,
                profileCode: 'ADMIN',
            };

            jest.spyOn(userProfileDao, 'findByCode').mockResolvedValue(null);
            jest.spyOn(userDao, 'findByEmail').mockResolvedValue(null);

            await expect(userService.createUser(createUserRequest)).rejects.toThrow(
                new HttpCustomException('Perfil de usuario no encontrado', StatusCodeEnums.USER_PROFILE_NOT_FOUND),
            );
        });
    });

    describe('listUsers', () => {
        it('should return a list of users', async () => {
            const users: User[] = [new User()];
            jest.spyOn(userDao, 'listUsers').mockResolvedValue(users);

            const result = await userService.listUsers();
            expect(result).toEqual(users.map((user) => new GetUserResponse(user)));
        });

        it('should throw an error if no users are found', async () => {
            jest.spyOn(userDao, 'listUsers').mockResolvedValue([]);

            await expect(userService.listUsers()).rejects.toThrow(
                new HttpCustomException('No se encontraron usuarios', StatusCodeEnums.USER_NOT_FOUND),
            );
        });
    });

    describe('findUserById', () => {
        it('should return a user by id', async () => {
            const user: User = new User();
            jest.spyOn(userDao, 'findById').mockResolvedValue(user);

            const result = await userService.findUserById(1);
            expect(result).toEqual(new GetUserResponse(user));
        });

        it('should throw an error if the user is not found', async () => {
            jest.spyOn(userDao, 'findById').mockResolvedValue(null);

            await expect(userService.findUserById(1)).rejects.toThrow(
                new HttpCustomException('Usuario no encontrado', StatusCodeEnums.USER_NOT_FOUND),
            );
        });
    });

    describe('updateUserById', () => {
        it('should update a user by id successfully', async () => {
            const updateUserRequest: UpdateUserRequest = {
                name: 'John',
                email: 'john@example.com',
                age: 30,
                profileCode: 'ADMIN',
            };

            const user: User = new User();
            jest.spyOn(userDao, 'findById').mockResolvedValue(user);
            jest.spyOn(userProfileDao, 'findByCode').mockResolvedValue(new UserProfile());
            jest.spyOn(userDao, 'update').mockResolvedValue(user);

            const result = await userService.updateUserById(1, updateUserRequest);
            expect(result).toEqual(new SuccessfulResponse('Usuario actualizado correctamente'));
        });

        it('should throw an error if the user is not found', async () => {
            const updateUserRequest: UpdateUserRequest = {
                name: 'John',
                email: 'john@example.com',
                age: 30,
                profileCode: 'ADMIN',
            };

            jest.spyOn(userDao, 'findById').mockResolvedValue(null);

            await expect(userService.updateUserById(1, updateUserRequest)).rejects.toThrow(
                new HttpCustomException('Usuario no encontrado', StatusCodeEnums.USER_NOT_FOUND),
            );
        });

        it('should throw an error if no fields are provided for update', async () => {
            const updateUserRequest: UpdateUserRequest = {};

            const user: User = new User();
            jest.spyOn(userDao, 'findById').mockResolvedValue(user);

            await expect(userService.updateUserById(1, updateUserRequest)).rejects.toThrow(
                new HttpCustomException('Debe proporcionar al menos un campo para actualizar', StatusCodeEnums.INVALID_REQUEST),
            );
        });

        it('should throw an error if the user profile does not exist', async () => {
            const updateUserRequest: UpdateUserRequest = {
                profileCode: 'ADMIN',
            };

            const user: User = new User();
            jest.spyOn(userDao, 'findById').mockResolvedValue(user);
            jest.spyOn(userProfileDao, 'findByCode').mockResolvedValue(null);

            await expect(userService.updateUserById(1, updateUserRequest)).rejects.toThrow(
                new HttpCustomException('Perfil de usuario no encontrado', StatusCodeEnums.USER_PROFILE_NOT_FOUND),
            );
        });
    });

    describe('deleteUserById', () => {
        it('should delete a user by id successfully', async () => {
            const user: User = new User();
            jest.spyOn(userDao, 'findById').mockResolvedValue(user);
            jest.spyOn(userDao, 'deleteById').mockResolvedValue();

            const result = await userService.deleteUserById(1);
            expect(result).toEqual(new SuccessfulResponse('Usuario eliminado correctamente'));
        });

        it('should throw an error if the user is not found', async () => {
            jest.spyOn(userDao, 'findById').mockResolvedValue(null);

            await expect(userService.deleteUserById(1)).rejects.toThrow(
                new HttpCustomException('Usuario no encontrado', StatusCodeEnums.USER_NOT_FOUND),
            );
        });
    });
});
