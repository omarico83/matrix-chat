import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../models/task';
import { taskRepository } from '../repositories/taskRepository';

export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task with id '${id}' not found`);
    this.name = 'TaskNotFoundError';
  }
}

export class TaskService {
  getAllTasks(): Task[] {
    return taskRepository.findAll();
  }

  getTaskById(id: string): Task {
    const task = taskRepository.findById(id);
    if (!task) {
      throw new TaskNotFoundError(id);
    }
    return task;
  }

  createTask(dto: CreateTaskDTO): Task {
    const now = new Date();
    const task: Task = {
      id: uuidv4(),
      title: dto.title,
      description: dto.description || '',
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    return taskRepository.save(task);
  }

  updateTask(id: string, dto: UpdateTaskDTO): Task {
    const task = this.getTaskById(id);
    const updatedTask: Task = {
      ...task,
      ...dto,
      updatedAt: new Date(),
    };
    return taskRepository.save(updatedTask);
  }

  deleteTask(id: string): void {
    if (!taskRepository.findById(id)) {
      throw new TaskNotFoundError(id);
    }
    taskRepository.delete(id);
  }
}

export const taskService = new TaskService();
