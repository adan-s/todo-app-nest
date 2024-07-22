import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './services/user.service';
import { Repository } from 'typeorm';
import { Users } from './entities/create-user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user-dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/user-dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<Users>;

  const mockUserServices = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
      ],
    }).overrideProvider(UserService).useValue(mockUserServices).compile();

    service = module.get<UserService>(UserService);
    //repo = module.get<new Repository<Users>(Users);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const usersArray = [
        { id: 1, username: 'testuser', email: 'test@example.com' },
      ];
      mockUserServices.find.mockResolvedValue(usersArray);

      expect(await service.getAllUsers()).toBe(usersArray);
    });
  });

  describe('addNewUser', () => {
    it('should successfully add a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password',
      };
      const newUser = {
        id: 2,
        ...createUserDto,
      };
      mockUserServices.create.mockReturnValue(newUser);
      mockUserServices.save.mockResolvedValue(newUser);

      expect(await service.addNewUser(createUserDto)).toBe(newUser);
    });

    it('should throw an error if user cannot be saved', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password',
      };
      mockUserServices.save.mockRejectedValue(new Error('Could not save user'));

      await expect(service.addNewUser(createUserDto)).rejects.toThrow('Could not save user');
    });
  });

  describe('updateUser', () => {
    it('should successfully update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
        email: 'updateduser@example.com',
        password: ''
      };
      const updatedUser = {
        id: 1,
        ...updateUserDto,
      };
      mockUserServices.update.mockResolvedValue(undefined);
      mockUserServices.findOneBy.mockResolvedValue(updatedUser);

      expect(await service.updateUser(1, updateUserDto)).toBe(updatedUser);
    });
  });
});
