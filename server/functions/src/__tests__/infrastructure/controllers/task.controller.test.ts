import { describe, it, beforeEach, expect } from "@jest/globals";
import { jest } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Request } from "express";

import { TaskController } from "../../../infrastructure/controllers/task.controller";
import { ITaskUseCase } from "../../../domain/usecases/task.usecase";
import { ITask } from "../../../domain/models/task";

describe("TaskController", () => {
  let mockTaskService: jest.Mocked<ITaskUseCase>;
  let serviceInjection: () => ITaskUseCase;
  let mockReq: Request<{ userId: string; id: string }>;
  let res: ReturnType<typeof getMockRes>["res"];
  let next: ReturnType<typeof getMockRes>["next"];

  beforeEach(() => {
    mockTaskService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<ITaskUseCase>;
    serviceInjection = () => mockTaskService;
    ({ res, next } = getMockRes());
  });

  describe("create", () => {
    it("should create a task successfully", async () => {
      const task: ITask = {
        title: "Test Task",
        description: "Test Description",
      };

      mockReq = getMockReq({
        body: task,
        params: { userId: "1", id: "" },
      }) as Request<{ userId: string; id: string }>;
      mockTaskService.create.mockResolvedValueOnce(undefined);

      await TaskController.create(mockReq, res, next, serviceInjection);
      expect(mockTaskService.create).toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return all tasks", async () => {
      mockReq = getMockReq({ params: { userId: "1", id: "" } }) as Request<{ userId: string; id: string }>;
      const tasks: ITask[] = [
        { id: "1", title: "task1", description: "description", createdAt: new Date("2023-01-01") },
        { id: "2", title: "task2", description: "description", createdAt: new Date("2023-01-02") },
      ];
      mockTaskService.findAll.mockResolvedValue(tasks);

      await TaskController.findAll(mockReq, res, serviceInjection);

      expect(mockTaskService.findAll).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith(tasks.sort((a, b) => (a.createdAt! > b.createdAt! ? 1 : -1)));
    });
  });

  describe("findOne", () => {
    it("should return a task", async () => {
      mockReq = getMockReq({ params: { userId: "1", id: "1" } }) as Request<{ userId: string; id: string }>;
      const task: ITask = { id: "1", title: "task1", description: "description", createdAt: new Date("2023-01-01") };
      mockTaskService.findOne.mockResolvedValue(task);

      await TaskController.findOne(mockReq, res, next, serviceInjection);

      expect(mockTaskService.findOne).toHaveBeenCalledWith("1", "1");
      expect(res.json).toHaveBeenCalledWith(task);
    });
  });
  describe("update", () => {
    it("should update a task successfully", async () => {
      const task: ITask = { title: "Updated Task", description: "Updated Description" };
      mockReq = getMockReq({
        body: task,
        params: { userId: "1", id: "1" },
      }) as Request<{ userId: string; id: string }>;
      mockTaskService.update.mockResolvedValue(task);

      await TaskController.update(mockReq, res, next, serviceInjection);

      expect(mockTaskService.update).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(task);
    });
  });

  describe("remove", () => {
    it("should remove a task successfully", async () => {
      mockReq = getMockReq({ params: { userId: "1", id: "1" } }) as Request<{ userId: string; id: string }>;
      const task: ITask = { title: "Deleted Task", description: "Deleted Description" };
      mockTaskService.remove.mockResolvedValue(task);

      await TaskController.remove(mockReq, res, next, serviceInjection);

      expect(mockTaskService.remove).toHaveBeenCalledWith("1", "1");
      expect(res.json).toHaveBeenCalledWith(task);
    });
  });
});