import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this._authService.hasNotCurrentUser()) {
      this._router.navigate(['sign-in'], {
        queryParams: {
          loginOrRegister: true,
        }
      });
  
      return false;
    }

    if (this._authService.isValidToken()) {
      return true;
    }

    this._router.navigate(['sign-in'], {
      queryParams: {
        loginAgain: true,
      }
    });

    return false;
  }
}