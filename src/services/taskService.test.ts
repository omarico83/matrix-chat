import { TaskService, TaskNotFoundError } from './taskService';
import { taskRepository } from '../repositories/taskRepository';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
    taskRepository.clear();
  });

  describe('createTask', () => {
    it('should create a task with pending status', () => {
      const task = service.createTask({ title: 'Test Task' });

      expect(task.title).toBe('Test Task');
      expect(task.status).toBe('pending');
      expect(task.id).toBeDefined();
    });

    it('should create a task with description', () => {
      const task = service.createTask({
        title: 'Test Task',
        description: 'Test Description',
      });

      expect(task.description).toBe('Test Description');
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', () => {
      const created = service.createTask({ title: 'Test Task' });
      const found = service.getTaskById(created.id);

      expect(found.id).toBe(created.id);
    });

    it('should throw TaskNotFoundError for non-existent task', () => {
      expect(() => service.getTaskById('non-existent')).toThrow(
        TaskNotFoundError
      );
    });
  });

  describe('updateTask', () => {
    it('should update task title', () => {
      const created = service.createTask({ title: 'Original' });
      const updated = service.updateTask(created.id, { title: 'Updated' });

      expect(updated.title).toBe('Updated');
    });

    it('should update task status', () => {
      const created = service.createTask({ title: 'Test' });
      const updated = service.updateTask(created.id, { status: 'completed' });

      expect(updated.status).toBe('completed');
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', () => {
      const created = service.createTask({ title: 'Test' });
      service.deleteTask(created.id);

      expect(() => service.getTaskById(created.id)).toThrow(TaskNotFoundError);
    });

    it('should throw TaskNotFoundError for non-existent task', () => {
      expect(() => service.deleteTask('non-existent')).toThrow(
        TaskNotFoundError
      );
    });
  });
});
