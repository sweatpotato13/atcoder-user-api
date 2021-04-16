import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggingInterceptor } from "@src/common/interceptors/logging.interceptor";
import { User } from "@src/entities/userinfo.entity";
import { AsyncLocalStorageModule } from "@src/shared/modules/async-local-storage/async-local-storage.module";
import { LoggerModule } from "@src/shared/modules/logger/logger.module";
import { TypeormModule } from "@src/shared/modules/typeorm/typeorm.module";

import { UserInfoService } from "./application/userinfo.service";
import { UserInfoAggregate } from "./domainModel/aggregate/userinfo.aggregate";

@Module({
    imports: [ScheduleModule.forRoot(), AsyncLocalStorageModule, LoggerModule, TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
    UserInfoService, UserInfoAggregate],
})
export class UserInfoModule { }
