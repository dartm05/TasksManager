import {IUser} from "../models/user";

export interface IUserUseCase {
    create(user: IUser): Promise<IUser | undefined>;
    findUserByEmail(email: string): Promise<IUser | undefined>;
}
