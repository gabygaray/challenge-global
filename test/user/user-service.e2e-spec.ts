import { TestingModule, Test } from '@nestjs/testing';
import { UserDao } from 'src/Daos/UserDao';
import { UserProfileDao } from 'src/Daos/UserProfileDao';
import { User } from 'src/Models/Entities/UserEntity';
import { UserProfile } from 'src/Models/Entities/UserProfileEntity';
import CreateUserRequest from 'src/Models/Request/User/CreateUserRequest';
import UpdateUserRequest from 'src/Models/Request/User/UpdateUserRequest';
import SuccessfulResponse from 'src/Models/Response/SuccessfulResponse';
import { GetUserResponse } from 'src/Models/Response/User/GetUserResponse';
import { UserService } from 'src/Services/UserService';

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
                        create: jest.fn(),
                        update: jest.fn(),
                        deleteById: jest.fn(),
                        findById: jest.fn(),
                        findByEmail: jest.fn(),
                        listUsers: jest.fn(),
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

    it('should create a user', async () => {
        const createUserRequest: CreateUserRequest = { name: 'John', email: 'john@example.com', age: 30, profileCode: 'ADMIN' };
        const userProfile: UserProfile = new UserProfile();
        jest.spyOn(userProfileDao, 'findByCode').mockResolvedValue(userProfile);
        jest.spyOn(userDao, 'findByEmail').mockResolvedValue(null);
        jest.spyOn(userDao, 'create').mockResolvedValue(new User());

        const result = await userService.createUser(createUserRequest);
        expect(result).toEqual(new SuccessfulResponse('Usuario creado correctamente'));
    });

    it('should list users', async () => {
        const users: User[] = [];
        jest.spyOn(userDao, 'listUsers').mockResolvedValue(users);

        const result = await userService.listUsers();
        expect(result).toEqual([]);
    });

    it('should find a user by id', async () => {
        const user: User = new User();
        jest.spyOn(userDao, 'findById').mockResolvedValue(user);

        const result = await userService.findUserById(1);
        expect(result).toEqual(new GetUserResponse(user));
    });

    it('should update a user by id', async () => {
        const updateUserRequest: UpdateUserRequest = { name: 'John', email: 'john@example.com', age: 30, profileCode: 'ADMIN' };
        const user: User = new User();
        jest.spyOn(userDao, 'findById').mockResolvedValue(user);
        jest.spyOn(userProfileDao, 'findByCode').mockResolvedValue(new UserProfile());
        jest.spyOn(userDao, 'update').mockResolvedValue(user);

        const result = await userService.updateUserById(1, updateUserRequest);
        expect(result).toEqual(new SuccessfulResponse('Usuario actualizado correctamente'));
    });

    it('should delete a user by id', async () => {
        const user: User = new User();
        jest.spyOn(userDao, 'findById').mockResolvedValue(user);
        jest.spyOn(userDao, 'deleteById').mockResolvedValue();

        const result = await userService.deleteUserById(1);
        expect(result).toEqual(new SuccessfulResponse('Usuario eliminado correctamente'));
    });
});
