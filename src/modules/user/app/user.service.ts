import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
    runOnTransactionCommit,
    runOnTransactionRollback,
    runOnTransactionComplete,
    Transactional
} from "typeorm-transactional-cls-hooked";
import { Cron, CronExpression } from "@nestjs/schedule";
import { IUserService } from "../domain/interfaces/user.interface";
import { ParseRankingCommand } from "../domain/commands/impl/parse-ranking.command";
import { GetUserQuery } from "../domain/queries/impl/get-user.command";
import { User } from "@src/common/entities";

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _queryBus: QueryBus
    ) {}

    @Transactional()
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async parseRanking(data: any): Promise<any> {
        try {
            const ret = await this._commandBus.execute(
                new ParseRankingCommand(data)
            );
            runOnTransactionCommit(() => {});
            return ret;
        } catch (error) {
            runOnTransactionRollback(() => {});
            throw error;
        } finally {
            runOnTransactionComplete(() => {});
        }
    }

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
