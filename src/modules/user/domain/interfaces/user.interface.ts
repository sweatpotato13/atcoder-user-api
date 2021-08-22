import { IUser } from "@src/common/entities/interfaces/user.interface";

export interface IUserService {
    getUserInfo(data: string): Promise<IUser>;
}
