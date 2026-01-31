import { Request, Response } from 'express';
import { taskService, TaskNotFoundError } from '../services/taskService';
import { CreateTaskDTO, UpdateTaskDTO } from '../models/task';

export class TaskController {
  getAllTasks(_req: Request, res: Response): void {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
  }

  getTaskById(req: Request, res: Response): void {
    try {
      const task = taskService.getTaskById(req.params.id);
      res.json(task);
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        res.status(404).json({ error: error.message });
        return;
      }
      throw error;
    }
  }

  createTask(req: Request, res: Response): void {
    const dto: CreateTaskDTO = req.body;
    if (!dto.title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    const task = taskService.createTask(dto);
    res.status(201).json(task);
  }

  updateTask(req: Request, res: Response): void {
    try {
      const dto: UpdateTaskDTO = req.body;
      const task = taskService.updateTask(req.params.id, dto);
      res.json(task);
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        res.status(404).json({ error: error.message });
        return;
      }
      throw error;
    }
  }

  deleteTask(req: Request, res: Response): void {
    try {
      taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        res.status(404).json({ error: error.message });
        return;
      }
      throw error;
    }
  }
}

export const taskController = new TaskController();
