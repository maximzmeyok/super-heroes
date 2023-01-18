import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HeroesService } from "./heroes.service";

@Injectable()
export class BattleGuard implements CanActivate {
  constructor(
    private _heroesService: HeroesService,
    private _router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this._heroesService.ownedHeroes.length) {
      return true;
    }

    this._router.navigate(['main/selection'], {
      queryParams: {
        hasNotSelectedHero: true,
      }
    });

    return false;
  }

}