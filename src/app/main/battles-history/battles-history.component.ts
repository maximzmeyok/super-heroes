import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BattleResult } from 'src/app/shared/interfaces';
import { BattleService } from 'src/app/shared/services/battle.service';

@Component({
  selector: 'app-battles-history',
  templateUrl: './battles-history.component.html',
  styleUrls: ['./battles-history.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlesHistoryComponent {
  public get battlesHistory(): BattleResult[] {
    return this._battleService.battlesHistory;
  }

  constructor(
    private _battleService: BattleService,
  ) { }

  public sortBattlesByDate(): void {
    this._battleService.sortBattlesHistory('date');
  }

  public sortBattlesByHeroName(): void {
    this._battleService.sortBattlesHistory('heroName');
  }

  public sortBattlesByEnemyName(): void {
    this._battleService.sortBattlesHistory('enemyName');
  }

  public sortBattlesByResult(): void {
    this._battleService.sortBattlesHistory('result');
  }

  public trackBattlesByFn(index: number, battleResult: BattleResult): number {
    return battleResult.date;
  }
}
