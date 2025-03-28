import request from "supertest";
import express from "express";
import taskApp from "../../infrastructure/routes/task.routes";
import {TaskController} from "../../infrastructure/controllers/task.controller";


jest.mock("../../infrastructure/controllers/task.controller");

describe("Task Routes", () => {
  const app = express();
  app.use(express.json());
  app.use("/", taskApp);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /:userId/tasks", () => {
    it("should return all tasks for a user", async () => {
      const mockTasks = [
        {id: "1", title: "Task 1", description: "Description 1"},
        {id: "2", title: "Task 2", description: "Description 2"},
      ];
      (TaskController.findAll as jest.Mock).mockImplementationOnce((req, res) =>
        res.json(mockTasks)
      );

      const response = await request(app).get("/123/tasks");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTasks);
      expect(TaskController.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /:userId/tasks/:id", () => {
    it("should return a single task by ID", async () => {
      const mockTask = {id: "1", title: "Task 1", description: "Description 1"};
      (TaskController.findOne as jest.Mock).mockImplementationOnce((req, res) =>
        res.json(mockTask)
      );

      const response = await request(app).get("/123/tasks/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTask);
      expect(TaskController.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /:userId/tasks", () => {
    it("should create a new task", async () => {
      const newTask = {title: "New Task", description: "New Description"};
      (TaskController.create as jest.Mock).mockImplementationOnce((req, res) =>
        res.status(201).json({id: "1", ...newTask})
      );

      const response = await request(app)
        .post("/123/tasks")
        .send(newTask);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({id: "1", ...newTask});
      expect(TaskController.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /:userId/tasks/:id", () => {
    it("should update an existing task", async () => {
      const updatedTask = {title: "Updated Task", description: "Updated Description"};
      (TaskController.update as jest.Mock).mockImplementationOnce((req, res) =>
        res.json({id: "1", ...updatedTask})
      );

      const response = await request(app)
        .put("/123/tasks/1")
        .send(updatedTask);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({id: "1", ...updatedTask});
      expect(TaskController.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /:userId/tasks/:id", () => {
    it("should delete a task by ID", async () => {
      (TaskController.remove as jest.Mock).mockImplementationOnce((req, res) =>
        res.status(204).send()
      );

      const response = await request(app).delete("/123/tasks/1");
      expect(response.status).toBe(204);
      expect(TaskController.remove).toHaveBeenCalledTimes(1);
    });
  });
});
