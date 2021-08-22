import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { IUser } from "@src/common/entities/interfaces/user.interface";
import { IUserService } from "../domain/interfaces/user.interface";
import { GetUserQuery } from "../domain/queries/impl/get-user.command";

@Injectable()
export class UserService implements IUserService {
    constructor(private readonly _queryBus: QueryBus) { }

    public async getUserInfo(data: string): Promise<IUser> {
        try {
            const ret = await this._queryBus.execute(new GetUserQuery(data));
            return ret;
        } catch (error) {
            throw error;
        }
    }
}
