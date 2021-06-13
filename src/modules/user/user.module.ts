import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CqrsModule, QueryHandler } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "@src/shared/repositories/user.repository";
import { LoggerService } from "@src/shared/services";
import { UserController } from "./app/user.controller";
import { UserService } from "./app/user.service";
import { CommandHandlers } from "./domain/commands/handlers";
import { QueryHandlers } from "./domain/queries/handlers";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserRepository]),
        UserRepository
    ],
    providers: [
        { provide: "UserService", useClass: UserService },
        LoggerService,
        ...CommandHandlers,
        ...QueryHandlers
    ],
    controllers: [UserController]
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {}
}
