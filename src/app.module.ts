import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "@common/interceptors/logging.interceptor";
import { UserModule } from "./modules/user/user.module";
import { BadRequestExceptionFilter } from "./common/filters/bad-request-exception.filter";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        UserModule,
        ScheduleModule.forRoot()
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: BadRequestExceptionFilter
        }
    ]
})
export class AppModule {
    constructor() {}
}
