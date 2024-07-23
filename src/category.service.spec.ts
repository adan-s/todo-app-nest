import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/category-dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/category-dto/update-category.dto';
import { Category, Users } from './entities';
import { CategoryService } from './services/category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of categories', async () => {
    const categories: Category[] = [
      {
        id: 1,
        category_name: 'Work',
        user_id: 1,
        user: new Users(),
        tasks: [],
      },
    ];
    mockCategoryRepository.find.mockResolvedValue(categories);

    expect(await service.getAllCategorys()).toEqual(categories);
  });
  it('should create and return a new category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      category_name: 'Personal',
      user_id: 1,
    };
    const category: Category = {
      id: 1,
      ...createCategoryDto,
      user: new Users(),
      tasks: [],
    };
    mockCategoryRepository.create.mockReturnValue(category);
    mockCategoryRepository.save.mockResolvedValue(category);

    expect(await service.addNewCategory(createCategoryDto)).toEqual(category);
  });

  it('should update and return the category', async () => {
    const updateCategoryDto: UpdateCategoryDto = {
      category_name: 'Updated Category',
      user_id: 1,
    };
    const category: Category = {
      id: 1,
      ...updateCategoryDto,
      user: new Users(),
      tasks: [],
    };
    mockCategoryRepository.update.mockResolvedValue(null);
    mockCategoryRepository.findOneBy.mockResolvedValue(category);

    expect(await service.updateCategory(1, updateCategoryDto)).toEqual(
      category,
    );
  });

  it('should delete the category', async () => {
    mockCategoryRepository.delete.mockResolvedValue(null);
    expect(await service.deleteCategory(1)).toBeNull();
  });
});
