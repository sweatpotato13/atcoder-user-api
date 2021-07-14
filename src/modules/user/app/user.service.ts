import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import {
    runOnTransactionCommit,
    runOnTransactionRollback,
    runOnTransactionComplete,
    Transactional
} from "typeorm-transactional-cls-hooked";
import { IUserService } from "../domain/interfaces/user.interface";
import { GetUserQuery } from "../domain/queries/impl/get-user.command";
import { User } from "@src/common/entities";

@Injectable()
export class UserService implements IUserService {
    constructor(private readonly _queryBus: QueryBus) {}

    @Transactional()
    public async getUserInfo(data: string): Promise<User> {
        try {
            const ret = await this._queryBus.execute(new GetUserQuery(data));
            runOnTransactionCommit(() => {});
            return ret;
        } catch (error) {
            runOnTransactionRollback(() => {});
            throw error;
        } finally {
            runOnTransactionComplete(() => {});
        }
    }
}
