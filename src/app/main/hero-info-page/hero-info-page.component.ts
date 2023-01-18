import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Hero } from 'src/app/shared/interfaces';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-hero-info-page',
  templateUrl: './hero-info-page.component.html',
  styleUrls: ['./hero-info-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroInfoPageComponent implements OnInit {
  public hero$: Observable<Hero>;

  constructor(
    private _route: ActivatedRoute,
    private _heroesService: HeroesService,
  ) { }

  public ngOnInit(): void {
    this._initHero();
  }

  private _initHero(): void {
    this.hero$ = this._route.params.pipe(
      switchMap((params: Params) => {
        return this._heroesService.getHeroById(params['id']);
      }),
    );
  }
}
