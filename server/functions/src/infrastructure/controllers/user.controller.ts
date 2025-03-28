import {Request, Response, NextFunction} from "express";
import {Error} from "../../domain/errors/base-error";
import {UserService} from "../../application/services/user.service";
import {IUserUseCase} from "../../domain/usecases/user.usecase";
import {UserDrivenAdapter} from "../driven-adapters/user.driven.adapter";


export class UserController {
  static async create(
    {body}: Request,
    res: Response,
    next: NextFunction,
    serviceInjection: () => IUserUseCase
  ): Promise<void> {
    const userService = serviceInjection();
    await userService.create(body);
    const user = await userService.findUserByEmail(body.email);
    if (!user) return next(new Error(500, "User not created", "The User could not be created", "UserNotCreatedError"));
    res.json(user);
  }

  static async findOne(
    {params: {email}}: Request,
    res: Response,
    next: NextFunction,
    serviceInjection: () => IUserUseCase
  ): Promise<void> {
    const userService = serviceInjection();
    const user = await userService.findUserByEmail(email);
    if (!user) return next(new Error(404, "User not found", "The User could not be found", "UserNotFoundError"));
    res.json(user);
  }
}

export function serviceInjection(): IUserUseCase {
  const userDrivenAdapter = new UserDrivenAdapter();
  const userService = new UserService(userDrivenAdapter);
  return userService;
}
