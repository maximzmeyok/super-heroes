import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse, Hero } from "../interfaces";

@Injectable()
export class HeroesService {
  public foundHeroes: Hero[] = [];
  public ownedHeroes: Hero[] = [];
  public selectedHero: Hero;
  public enemyHero: Hero;
  public uppedPowerstats: string[] = [];

  private _accessToken: string = '5801140193305183';

  constructor(
    private _http: HttpClient,
  ) {}

  public getHeroes(searchValue: string): Observable<ApiResponse> {
    const url: string = `https://www.superheroapi.com/api.php/${this._accessToken}/search/${searchValue}`;

    return this._http.get<ApiResponse>(url);
  }

  public getHeroById(heroId: string): Observable<Hero> {
    const url: string = `https://www.superheroapi.com/api.php/${this._accessToken}/${heroId}`;

    return this._http.get<Hero>(url);
  }

  public getRandomHero(): Observable<Hero> {
    const heroId: number = this._getRandomId(1, 731);
    const url: string = `https://www.superheroapi.com/api.php/${this._accessToken}/${heroId}`;

    return this._http.get<Hero>(url);
  }

  public addToOwned(hero: Hero): void {
    const hasSelectedHero: boolean = !!this.selectedHero;
    const selectedHeroId: string = hasSelectedHero ? this.selectedHero.id : '';

    this.selectedHero = hero;
    this.ownedHeroes = [...this.ownedHeroes, hero];
    this._selectEnemyHero();

    if (!hasSelectedHero) {
      return;
    }

    this._updateSelectedHero(selectedHeroId);
  }

  public removeFromOwned(hero: Hero): void {
    const hasOwnedHeroes: boolean = this.ownedHeroes.length > 1;

    this.ownedHeroes = this.ownedHeroes.filter((ownedHero: Hero) => ownedHero.id !== hero.id);
    this._selectEnemyHero();

    if (!hasOwnedHeroes) {
      return;
    }

    this.selectedHero = this.ownedHeroes[this.ownedHeroes.length - 1];
    this._updateSelectedHero(this.selectedHero.id);
  }

  public upPowerstat(powerstat: string): void {
    this.selectedHero.powerstats[`${powerstat}`] = +this.selectedHero.powerstats[`${powerstat}`] + 10;
  }

  public downPowerstat(powerstat: string): void {
    this.selectedHero.powerstats[`${powerstat}`] = +this.selectedHero.powerstats[`${powerstat}`] - 10;
  }

  public compareHeroes(): string {
    const heroPower: number = this._countPower(this.selectedHero);
    const enemyPower: number = this._countPower(this.enemyHero);

    return heroPower < enemyPower ? "LOST" : "WON";
  }

  public filterHeroes(foundHeroes: Hero[]): Hero[] {
    return foundHeroes.filter((foundHero: Hero) => this.isValidHero(foundHero));
  }

  public isValidHero(foundHero: Hero): boolean {
    const powerstatsValues: string[] = Object.values(foundHero.powerstats);
    const isValidPowerstats: boolean = !powerstatsValues.includes('null');
    
    return isValidPowerstats;
  }

  private _updateSelectedHero(heroId: string): void {
    const heroIndex: number = this.foundHeroes.findIndex((foundHero: Hero) => foundHero.id === heroId);

    this.foundHeroes[heroIndex] = {...this.foundHeroes[heroIndex]};
  }

  private _selectEnemyHero(): void {
    const randomId: string = this._getRandomId(1, 731).toString();

    this.getHeroById(randomId).subscribe((apiResponse: Hero): void => {
      const isValidHero: boolean = this.isValidHero(apiResponse);

      if (!isValidHero) {
        this._selectEnemyHero();
        return;
      }

      this.enemyHero = apiResponse;
    });
  }

  private _getRandomId(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private _countPower(hero: Hero): number {
    const powerstats: string[] = Object.values(hero.powerstats);
    const power: number = powerstats.reduce((sum: number, powerstat:string): number => sum + +powerstat, 0);

    return power;
  }
}