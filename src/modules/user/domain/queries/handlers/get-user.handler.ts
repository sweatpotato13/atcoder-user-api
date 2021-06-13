import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/common/entities";
import { IUserRepository } from "@src/shared/interfaces/repository/user-repository.interface";
import { LoggerService } from "@src/shared/services";
import { GetUserQuery } from "../impl/get-user.command";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        @InjectRepository(User)
        private readonly _userRepo: IUserRepository,
        private readonly loggerService: LoggerService
    ) {}

    async execute(command: GetUserQuery): Promise<User> {
        const { data } = command;
        try {
            const result = await this._userRepo.findUserById(data);
            if (!result) {
                throw "User doesn't exist";
            }
            this.loggerService.info(`successfully queried : ${result}`);
            return result;
        } catch (err) {
            console.error("Exception at GetUserHandler: ", err);
            throw err;
        }
    }
}
