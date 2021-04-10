import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "@src/common/interceptors/logging.interceptor";
import { AsyncLocalStorageModule } from "@src/shared/modules/async-local-storage/async-local-storage.module";
import { LoggerModule } from "@src/shared/modules/logger/logger.module";

import { AtcoderController } from "./application/controllers/atcoder.controller";
import { AtcoderService } from "./application/services/atcoder.service";
import { AtcoderAggregate } from "./domainModel/aggregate/atcoder.aggregate";

@Module({
    imports: [AsyncLocalStorageModule, LoggerModule, AtcoderModule],
    controllers: [AtcoderController],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
        AtcoderService, AtcoderAggregate],
})
export class AtcoderModule { }
