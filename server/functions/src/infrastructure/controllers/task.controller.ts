
import {Request, Response, NextFunction} from "express";
import {ITaskUseCase} from "../../domain/usecases/task.usecase";
import {TaskService} from "../../application/services/task.service";
import {TaskDrivenAdapter} from "../driven-adapters/task.driven.adapter";
import {Error} from "../../domain/errors/base-error";


export class TaskController {
  static async create(
    {params: {userId}, body}: Request<{ userId: string }>,
    res: Response,
    next: NextFunction,
    serviceInjection: () => ITaskUseCase
  ): Promise<void> {
    const taskService = serviceInjection();
    const createdAt = new Date().toISOString();
    body = {...body, createdAt: createdAt};
    const success = await taskService.create(userId, body);
    if (!success) return next(new Error(500, "Task not created", "The Task could not be created", "TaskNotCreatedError"));
    res.json(success);
  }

  static async findAll(
    {params: {userId}}: Request<{ userId: string }>,
    res: Response,
    serviceInjection: () => ITaskUseCase
  ): Promise<void> {
    const taskService = serviceInjection();
    const tasks = (await taskService.findAll(userId)).sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });
    res.json(tasks);
  }

  static async findOne(
    {params: {userId, id}}: Request<{ userId: string; id: string }>,
    res: Response,
    next: NextFunction,
    serviceInjection: () => ITaskUseCase
  ): Promise<void> {
    const taskService = serviceInjection();
    const task = await taskService.findOne(userId, id);
    if (!task) return next(new Error(404, "Task not found", "The Task could not be found", "TaskNotFoundError"));
    res.json(task);
  }

  static async update(
    {params: {userId, id}, body}: Request<{ userId: string; id: string }>,
    res: Response,
    next: NextFunction,
    serviceInjection: () => ITaskUseCase
  ): Promise<void> {
    const taskService = serviceInjection();
    const success = await taskService.update(userId, id, body);
    if (!success) return next(new Error(500, "Task not updated", "The Task could not be updated", "TaskNotUpdatedError"));
    res.json(success);
  }

  static async remove(
    {params: {userId, id}}: Request<{ userId: string; id: string }>,
    res: Response,
    next: NextFunction,
    serviceInjection: () => ITaskUseCase
  ): Promise<void> {
    const taskService = serviceInjection();
    const success = await taskService.remove(userId, id);
    if (!success) return next(new Error(500, "Task not removed", "The Task could not be removed", "TaskNotRemovedError"));
    res.json(success);
  }
}

export function serviceInjection(): ITaskUseCase {
  const taskDrivenAdapter = new TaskDrivenAdapter();
  const taskService = new TaskService(taskDrivenAdapter);
  return taskService;
}
