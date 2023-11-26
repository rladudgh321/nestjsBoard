import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Ip = createParamDecorator((date:unknown, ctx:ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip;
});