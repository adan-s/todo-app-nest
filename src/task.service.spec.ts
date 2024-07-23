import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskService } from './services/task.service';
import { Task } from './entities';
import { CreateTaskDto } from './dto/task-dto/create-task.dto';
import { UpdateTaskDto } from './dto/task-dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;

  const mockTaskRepository = {
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
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Task Description',
        status: 'pending',
        user_id: 1,
        user: null,
        category_id: 1,
        category: null,
        duedate: new Date(),
      } ,
    ];
    mockTaskRepository.find.mockResolvedValue(tasks);

    expect(await service.getAllTasks()).toEqual(tasks);
  });

  it('should return an array of tasks for the specified user', async () => {
    const userId = 1;
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Task Description',
        status: 'pending',
        user_id: userId,
        user: null,
        category_id: 1,
        category: null,
        duedate: new Date(),
      } ,
    ];

    mockTaskRepository.find.mockResolvedValue(tasks);
    expect(await service.getUserTasks(userId)).toEqual(tasks);
  });

  it('should create and return a new task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'Task Description',
      status: 'pending',
      user_id: 1,
      category_id: 1,
      duedate: new Date(),
    };
    const task: Task = {
      id: 1,
      ...createTaskDto,
      user: null,
      category: null,
    } as Task;

    mockTaskRepository.create.mockReturnValue(task);
    mockTaskRepository.save.mockResolvedValue(task);
    expect(await service.addNewTask(createTaskDto)).toEqual(task);
  });

  it('should update and return the task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'Updated Description',
      status: 'completed',
      user_id: 1,
      category_id: 1,
      duedate: new Date(),
    };
    const task: Task = {
      id: 1,
      ...updateTaskDto,
      user: null,
      category: null,
    } ;

    mockTaskRepository.update.mockResolvedValue(null);
    mockTaskRepository.findOneBy.mockResolvedValue(task);
    expect(await service.updateTask(1, updateTaskDto)).toEqual(task);
  });

  it('should delete the task', async () => {
    mockTaskRepository.delete.mockResolvedValue(null);

    expect(await service.deleteTask(1)).toBeNull();
  });
});
