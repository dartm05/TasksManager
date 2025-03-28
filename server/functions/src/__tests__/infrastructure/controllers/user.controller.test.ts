import { IUserUseCase } from "../../../domain/usecases/user.usecase";
import { IUser } from "../../../domain/models/user";
import { describe, it, beforeEach, expect } from "@jest/globals";
import { jest } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { UserController } from "../../../infrastructure/controllers/user.controller";
import { Error } from "../../../domain/errors/base-error";
 

describe("UserController", () => {
  let mockUserService: jest.Mocked<IUserUseCase>;
  let serviceInjection: () => IUserUseCase;
  let mockReq;
  
  beforeEach(() => {
    
    mockUserService = {
      create: jest.fn(),
      findUserByEmail: jest.fn(),
    };
    serviceInjection = () => mockUserService;
  });

  describe("create", () => {
    const { res, next } = getMockRes({
      json: jest.fn() as any,
      status: jest.fn().mockReturnThis(),
    });

    it("should create a user and return user data", async () => {
      mockReq = getMockReq({
        body: { name: "John Doe", email: "john@gmail.com" },
      });

      mockUserService.create.mockResolvedValueOnce(undefined);
      const mockUser = { email: "john@gmail.com", name: "John Doe" } as IUser;
      mockUserService.findUserByEmail.mockResolvedValueOnce(mockUser);

      await UserController.create(mockReq, res, next, serviceInjection);

      expect(mockUserService.create).toHaveBeenCalledWith(mockReq.body);
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "john@gmail.com"
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with UserNotCreatedError if user is not found after creation", async () => {
      mockReq = getMockReq({
        body: { name: "John Doe", email: "john@gmail.com" },
      });

      mockUserService.create.mockResolvedValueOnce(undefined);
      mockUserService.findUserByEmail.mockResolvedValueOnce(undefined);

      await UserController.create(mockReq, res, next, serviceInjection);

      expect(mockUserService.create).toHaveBeenCalledWith(mockReq.body);

      expect(next).toHaveBeenCalledWith(new Error(500, "User not created", "The User could not be created", "UserNotCreatedError"));
    });
  });

  describe("findOne", () => {
    const { res, next } = getMockRes({
      json: jest.fn() as any,
      status: jest.fn().mockReturnThis(),
    });

    it("should find a user and return user data", async () => {
      mockReq = getMockReq({ params: { email: "test@example.com" } });

      const mockUser = {
        email: "test@example.com",
        id: "1",
        name: "Test User",
      };

      mockUserService.findUserByEmail.mockResolvedValueOnce(mockUser);

      await UserController.findOne(mockReq, res, next, serviceInjection);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(res.json).toHaveBeenCalledWith(mockUser);
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with UserNotFoundError if user is not found", async () => {
      mockReq = getMockReq({ params: { email: "nonexistent@example.com" } });
      mockUserService.findUserByEmail.mockResolvedValueOnce(undefined);

      await UserController.findOne(mockReq, res, next, serviceInjection);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(
        "nonexistent@example.com"
      );
      expect(next).toHaveBeenCalledWith(new Error(404, "User not found", "The User could not be found", "UserNotFoundError"));
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});