import { CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';



@Injectable ({ providedIn: 'root' })
export class AuthGuard implements CanActivate
{
    constructor (
        private route: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        const currentUser = this.authenticationService.currentUser;

        if(currentUser)
            return true;

        this.route.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}