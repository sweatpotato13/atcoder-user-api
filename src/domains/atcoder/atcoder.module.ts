import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggingInterceptor } from "@src/common/interceptors/logging.interceptor";
import { User } from "@src/entities/userinfo.entity";
import { AsyncLocalStorageModule } from "@src/shared/modules/async-local-storage/async-local-storage.module";
import { LoggerModule } from "@src/shared/modules/logger/logger.module";
import { TypeormModule } from "@src/shared/modules/typeorm/typeorm.module";

import { AtcoderController } from "./application/controllers/atcoder.controller";
import { AtcoderService } from "./application/services/atcoder.service";
import { AtcoderAggregate } from "./domainModel/aggregate/atcoder.aggregate";

@Module({
    imports: [AsyncLocalStorageModule, LoggerModule, TypeOrmModule.forFeature([User])],
    controllers: [AtcoderController],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
        AtcoderService, AtcoderAggregate],
})
export class AtcoderModule { }
