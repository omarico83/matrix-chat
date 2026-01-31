import { Task } from '../models/task';

/**
 * In-memory storage for tasks.
 * In a real application, this would be replaced with a database.
 */
class TaskRepository {
  private tasks: Map<string, Task> = new Map();

  findAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  findById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  save(task: Task): Task {
    this.tasks.set(task.id, task);
    return task;
  }

  delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  clear(): void {
    this.tasks.clear();
  }
}

// Singleton instance
export const taskRepository = new TaskRepository();
