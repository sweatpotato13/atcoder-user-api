import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { LoggerService } from "@src/shared/modules/logger/logger.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const {
            url,
            method,
            remoteAddress,
            headers,
        } = context.switchToHttp().getRequest();

        const ip = headers["x-forwarded-for"] || remoteAddress;

        this.logger.info(`${method} ${url}`, {
            context: "Interceptor",
            ip,
        });

        const now = Date.now();
        return next.handle().pipe(
            tap(() =>
                this.logger.info(`${Date.now() - now}ms time elapsed`, {
                    context: "Interceptor",
                    ip,
                })
            )
        );
    }
}
