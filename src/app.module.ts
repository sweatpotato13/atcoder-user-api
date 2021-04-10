import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { AtcoderModule } from "./domains/atcoder/atcoder.module";
import { AsyncLocalStorageModule } from "./shared/modules/async-local-storage/async-local-storage.module";
import { LoggerModule } from "./shared/modules/logger/logger.module";

@Module({
    imports: [AsyncLocalStorageModule, LoggerModule, AtcoderModule],
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
export class AppModule {}
