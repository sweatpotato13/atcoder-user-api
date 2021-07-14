import { User } from "@src/common/entities";

export interface IUserService {
    getUserInfo(data: string): Promise<User>;
}
