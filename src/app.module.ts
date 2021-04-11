import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";

import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { AtcoderModule } from "./domains/atcoder/atcoder.module";
import { UserInfoModule } from "./domains/userinfo/userinfo.module";
import { AsyncLocalStorageModule } from "./shared/modules/async-local-storage/async-local-storage.module";
import { LoggerModule } from "./shared/modules/logger/logger.module";
import { TypeormModule } from "./shared/modules/typeorm/typeorm.module";

@Module({
    imports: [AsyncLocalStorageModule, LoggerModule, AtcoderModule, TypeormModule, UserInfoModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule { }
