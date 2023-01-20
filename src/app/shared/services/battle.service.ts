import { Injectable } from "@angular/core";
import { BattleResult } from "../interfaces";
import { DATE, ENEMY_NAME, HERO_NAME, RESULT } from "../variables";
import { HeroesService } from "./heroes.service";
import { PowerUpsService } from "./power-ups.service";

@Injectable()
export class BattleService {
  public battlesHistory: BattleResult[] = [];
  public uppedPowerstats: string[] = [];

  constructor(
    private _heroesService: HeroesService,
    private _powerUpsService: PowerUpsService,
  ) { }

  public sortBattlesHistory(filter: string): void {
    switch(filter) {
      case DATE:
        this.battlesHistory.sort((a: BattleResult, b: BattleResult): number => a.date - b.date);
        break;
      case HERO_NAME:
        this.battlesHistory.sort((a: BattleResult, b: BattleResult): number => this._compareStrings(a.heroName, b.heroName));
        break;
      case ENEMY_NAME:
        this.battlesHistory.sort((a: BattleResult, b: BattleResult): number => this._compareStrings(a.enemyName, b.enemyName));
        break;
      case RESULT:
        this.battlesHistory.sort((a: BattleResult, b: BattleResult): number => this._compareStrings(a.result, b.result));
        break;
    }
  }

  public changePowerstat(powerstat: string): void {
    const isUppedPowerstat: boolean = this.uppedPowerstats.some((uppedPowerstat: string): boolean => uppedPowerstat ===  powerstat);

    isUppedPowerstat ? this._cancelPowerUp(powerstat) : this._usePowerUp(powerstat);
  }

  public resetUppedPowerstats(): void {
    this.uppedPowerstats.forEach((uppedPowerstat: string): void => {
      this._heroesService.downPowerstat(uppedPowerstat);
    });
    this.uppedPowerstats = [];
  }

  public getBattleResult(): BattleResult {
    const battleResult: string = this._heroesService.compareHeroes();
    const battleResultFull: BattleResult = this._createBattleResult(battleResult);

    this.battlesHistory.push(battleResultFull);

    return battleResultFull;
  }

  public updatePowerUps(): void {
    this._powerUpsService.changePowerUps(this.uppedPowerstats);
  }

  private _compareStrings(a: string, b: string): number {
    return a.localeCompare(b);
  }

  private _usePowerUp(powerstat: string): void {
    this.uppedPowerstats.push(powerstat);
    this._heroesService.upPowerstat(powerstat);
  }

  private _cancelPowerUp(powerstat: string): void {
    const uppedPowerstatIndex: number = this.uppedPowerstats.findIndex((uppedPowerstat: string): boolean => uppedPowerstat === powerstat);

    this.uppedPowerstats.splice(uppedPowerstatIndex, 1);
    this._heroesService.downPowerstat(powerstat);
  }

  private _createBattleResult(battleResult: string): BattleResult {
    return {
      date: Date.now(),
      heroName: this._heroesService.selectedHero.name,
      heroId: this._heroesService.selectedHero.id,
      enemyName: this._heroesService.enemyHero.name,
      enemyId: this._heroesService.enemyHero.id,
      result: battleResult
    }
  }
}