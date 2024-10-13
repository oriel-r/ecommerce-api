import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./utils/roles.enum";
import { extractRequest } from "src/helpers/extract-request";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])
        const user = extractRequest(context)['user']
        if(!user || !requiredRoles ) return false
        const hasRole = requiredRoles.some((role => user.role?.includes(role)))
		return hasRole && user.role === Role.ADMIN
    }   
}