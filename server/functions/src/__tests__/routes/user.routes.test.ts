import request from "supertest";
import express from "express";
import userApp from "../../infrastructure/routes/user.routes";
import { UserController } from "../../infrastructure/controllers/user.controller";

 
jest.mock("../../infrastructure/controllers/user.controller");

describe("User Routes", () => {
  const app = express();
  app.use(express.json());
  app.use("/", userApp);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = { email: "test@example.com", name: "Test User" };
      (UserController.create as jest.Mock).mockImplementationOnce((req, res) =>
        res.status(201).json({ id: "1", ...newUser })
      );

      const response = await request(app).post("/users").send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: "1", ...newUser });
      expect(UserController.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /users/:email", () => {
    it("should return a user by email", async () => {
      const mockUser = { id: "1", email: "test@example.com", name: "Test User" };
      (UserController.findOne as jest.Mock).mockImplementationOnce((req, res) =>
        res.json(mockUser)
      );

      const response = await request(app).get("/users/test@example.com");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(UserController.findOne).toHaveBeenCalledTimes(1);
    });
  });
});