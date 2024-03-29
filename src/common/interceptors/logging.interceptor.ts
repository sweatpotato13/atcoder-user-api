import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { logger } from "@common/winston";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        logger.info("[api] Before...");

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => logger.info(`[api] After... ${Date.now() - now}ms`))
            );
    }
}
