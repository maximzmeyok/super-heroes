import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse, Hero } from "../interfaces";

@Injectable()
export class HeroesService {
  public foundHeroes: Hero[] = [];
  public ownedHeroes: Hero[] = [];
  public selectedHero: Hero;

  private _accessToken: string = '5801140193305183';

  constructor(
    private _http: HttpClient,
  ) {}

  public getHeroes(searchValue: string): Observable<ApiResponse> {
    const url: string = `https://www.superheroapi.com/api.php/${this._accessToken}/search/${searchValue}`;

    return this._http.get<ApiResponse>(url);
  }

  public addToOwned(hero: Hero): void {
    const hasSelectedHero: boolean = !!this.selectedHero;
    const selectedHeroId: string = hasSelectedHero ? this.selectedHero.id : '';

    this.selectedHero = hero;
    this.ownedHeroes = [...this.ownedHeroes, hero];

    if (!hasSelectedHero) {
      return;
    }

    this._updateSelectedHero(selectedHeroId);
  }

  public removeFromOwned(hero: Hero): void {
    const hasOwnedHeroes: boolean = this.ownedHeroes.length > 1;

    this.ownedHeroes = this.ownedHeroes.filter((ownedHero: Hero) => ownedHero.id !== hero.id);

    if (!hasOwnedHeroes) {
      return;
    }

    this.selectedHero = this.ownedHeroes[this.ownedHeroes.length - 1];
    this._updateSelectedHero(this.selectedHero.id);
  }

  public getHeroById(heroId: string): Observable<Hero> {
    const url: string = `https://www.superheroapi.com/api.php/${this._accessToken}/${heroId}`;

    return this._http.get<Hero>(url);
  }

  private _updateSelectedHero(heroId: string): void {
    const heroIndex: number = this.foundHeroes.findIndex((foundHero: Hero) => foundHero.id === heroId);

    this.foundHeroes[heroIndex] = {...this.foundHeroes[heroIndex]};
  }
}