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

  const mockUserRepository = {
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
        {
          provide: getRepositoryToken(Users),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const usersArray = [
        { id: 1, username: 'testuser', email: 'test@example.com' },
      ];
      mockUserRepository.find.mockResolvedValue(usersArray);

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
      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValue(newUser);

      expect(await service.addNewUser(createUserDto)).toBe(newUser);
    });

    it('should throw an error if user cannot be saved', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password',
      };
      mockUserRepository.save.mockRejectedValue(new Error('Could not save user'));

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
      mockUserRepository.update.mockResolvedValue(undefined);
      mockUserRepository.findOneBy.mockResolvedValue(updatedUser);

      expect(await service.updateUser(1, updateUserDto)).toBe(updatedUser);
    });
  });
});