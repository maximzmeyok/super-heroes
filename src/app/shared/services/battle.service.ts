import { Injectable } from "@angular/core";
import { BattleResult } from "../interfaces";
import { DATE, ENEMY_NAME, HERO_NAME, RESULT } from "../variables";

@Injectable()
export class BattleService {
  public battlesHistory: BattleResult[] = [];

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

  private _compareStrings(a: string, b: string): number {
    return a.localeCompare(b);
  }
}