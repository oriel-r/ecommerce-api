import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./utils/roles.enum";
import { extractRequest } from "src/helpers/extract-request";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])
        const req = context.switchToHttp().getRequest()
        const user = req.user
        console.log(user)
        console.log()
        if(!user || !requiredRoles ) return false
        const hasRole = () => requiredRoles.some((role) => user.roles?.includes(role))
		const isValid = user?.roles && hasRole()
        if(!isValid) {
            throw new UnauthorizedException('You dont have permissions for this route')
        }
        return isValid
    }   
}