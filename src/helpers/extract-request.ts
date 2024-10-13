import { ExecutionContext } from "@nestjs/common";

export const extractRequest = (context: ExecutionContext) => context.switchToHttp().getRequest()
