import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { LoggerService } from "@src/shared/services";
import { GraphqlService } from "@src/shared/services/graphql.service";
import { UserController } from "./app/user.controller";
import { UserService } from "./app/user.service";
import { QueryHandlers } from "./domain/queries/handlers";

@Module({
    imports: [
        CqrsModule,
    ],
    providers: [
        { provide: "UserService", useClass: UserService },
        GraphqlService,
        LoggerService,
        ...QueryHandlers
    ],
    controllers: [UserController]
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {}
}
