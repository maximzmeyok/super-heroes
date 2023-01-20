import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BattleResult, Hero, PowerUp } from 'src/app/shared/interfaces';
import { BattleService } from 'src/app/shared/services/battle.service';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { PowerUpsService } from 'src/app/shared/services/power-ups.service';

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlePageComponent implements OnDestroy {
  public isFighting: boolean = false;
  public hasModal: boolean = false;
  public battleResult: BattleResult;

  public get selectedHero(): Hero {
    return this._heroesService.selectedHero;
  }
  
  public get enemyHero(): Hero {
    return this._heroesService.enemyHero;
  }

  public get powerUps(): PowerUp[] {
    return this._powerUpsService.sortPowerUps().filter((item: PowerUp): boolean => item.value > 0);
  }

  constructor(
    private _heroesService: HeroesService,
    private _powerUpsService: PowerUpsService,
    private _battleService: BattleService,
    private _cd: ChangeDetectorRef,
  ) { }

  public ngOnDestroy(): void {
    this._battleService.resetUppedPowerstats();
  }

  public trackPowerUpsByFn(index: number, powerUp: PowerUp): string {
    return powerUp.name;
  }

  public selectPowerUp(powerstat: string): void {
    this._battleService.changePowerstat(powerstat);
  }

  public isSelected(powerstat: string): boolean {
    return this._battleService.uppedPowerstats.includes(powerstat);
  }

  public isUpped(powerstat: string): boolean {
    return this._battleService.uppedPowerstats.includes(powerstat);
  }

  public fight(): void {
    this.isFighting = true;
    this._battleService.updatePowerUps();
    this.battleResult = this._battleService.getBattleResult();
    this._battleService.resetUppedPowerstats();

    setTimeout((): void => {
      this.isFighting = false;
      this.hasModal = true;
      this._cd.markForCheck();
    }, 5000);
  }

  public closeModal(): void {
    this.hasModal = false;
  }

  public replaceEnemy(): void {
    
  }
}
