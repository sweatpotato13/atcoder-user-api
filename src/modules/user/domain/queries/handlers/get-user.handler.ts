import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { IUser } from "@src/common/entities/interfaces/user.interface";
import { LoggerService } from "@src/shared/services";
import { GraphqlService } from "@src/shared/services/graphql.service";
import { GetUserQuery } from "../impl/get-user.command";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        private readonly graphqlService: GraphqlService,
        private readonly loggerService: LoggerService
    ) { }

    async execute(command: GetUserQuery): Promise<any> {
        const { data } = command;
        try {
            const result: any = await this.graphqlService.getUser(data);
            if (!result) {
                throw "User doesn't exist";
            }
            this.loggerService.info(`successfully queried : ${data}`);
            return result.data.user[0];
        } catch (err) {
            console.error("Exception at GetUserHandler: ", err);
            throw err;
        }
    }
}
