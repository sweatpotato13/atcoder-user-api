import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from "@config";
import { User } from '@src/entities/userinfo.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "postgres",
            "host": config.postgres_ip,
            "port": config.postgres_port,
            "username": "postgres",
            "password": config.postgres_password,
            "database": config.postgres_db,
            "entities": [User]
        }),
    ]
})
export class TypeormModule {}
