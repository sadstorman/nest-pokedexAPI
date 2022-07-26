import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, timeout } from "rxjs";

export class timeOutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(timeout(120000))
    }
}