import { User } from "@src/common/entities";

export interface IUserService {
    parseRanking(data: any): Promise<any>;
    getUserInfo(data: string): Promise<User>;
}
