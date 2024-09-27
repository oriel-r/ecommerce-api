import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./utils/roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])
        const req = context.switchToHttp().getRequest<Request>();
        const user = req['user']
        const hasRole = () => requiredRoles.some((role => user?.role?.includes(role)))
		return user && user.role && hasRole() && user.role === Role.ADMIN
    }   
}