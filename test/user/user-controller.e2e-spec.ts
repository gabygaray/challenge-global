import { TestingModule, Test } from '@nestjs/testing';
import { UserController } from 'src/Controllers/UserController';
import { UserDao } from 'src/Daos/UserDao';
import { User } from 'src/Models/Entities/UserEntity';
import CreateUserRequest from 'src/Models/Request/User/CreateUserRequest';
import UpdateUserRequest from 'src/Models/Request/User/UpdateUserRequest';
import SuccessfulResponse from 'src/Models/Response/SuccessfulResponse';
import { GetUserResponse } from 'src/Models/Response/User/GetUserResponse';
import { UserService } from 'src/Services/UserService';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let userDao: UserDao;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        createUser: jest.fn(),
                        listUsers: jest.fn(),
                        findUserById: jest.fn(),
                        updateUserById: jest.fn(),
                        deleteUserById: jest.fn(),
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    it('should create a user', async () => {
        const createUserRequest: CreateUserRequest = { name: 'John', email: 'john@example.com', age: 30, profileCode: 'ADMIN' };
        const result: SuccessfulResponse = new SuccessfulResponse('Usuario creado correctamente');
        jest.spyOn(userService, 'createUser').mockResolvedValue(result);

        expect(await userController.createUser(createUserRequest)).toBe(result);
    });

    it('should list users', async () => {
        const result: GetUserResponse[] = [];
        jest.spyOn(userService, 'listUsers').mockResolvedValue(result);

        expect(await userController.listUsers()).toBe(result);
    });

    it('should find a user by id', async () => {
        const user: User = new User();
        jest.spyOn(userDao, 'findById').mockResolvedValue(user);

        const result = await userService.findUserById(1);
        expect(result).toEqual(new GetUserResponse(user));
    });

    it('should update a user by id', async () => {
        const updateUserRequest: UpdateUserRequest = { name: 'John', email: 'john@example.com', age: 30, profileCode: 'ADMIN' };
        const result: SuccessfulResponse = new SuccessfulResponse('Usuario actualizado correctamente');
        jest.spyOn(userService, 'updateUserById').mockResolvedValue(result);

        expect(await userController.updateUserById(1, updateUserRequest)).toBe(result);
    });

    it('should delete a user by id', async () => {
        const result: SuccessfulResponse = new SuccessfulResponse('Usuario eliminado correctamente');
        jest.spyOn(userService, 'deleteUserById').mockResolvedValue(result);

        expect(await userController.deleteUserById(1)).toBe(result);
    });
});
