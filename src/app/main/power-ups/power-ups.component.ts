import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PowerUp } from 'src/app/shared/interfaces';
import { PowerUpsService } from 'src/app/shared/services/power-ups.service';

@Component({
  selector: 'app-power-ups',
  templateUrl: './power-ups.component.html',
  styleUrls: ['./power-ups.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerUpsComponent {
  public get powerUps(): PowerUp[] {
    return this._powerUpsService.sortPowerUps().filter((item: PowerUp): boolean => item.value > 0);
  }
  
  public get allPowerUps(): PowerUp[] {
    return this._powerUpsService.sortPowerUps();
  }

  constructor(
    private _powerUpsService: PowerUpsService,
  ) { }

  public trackPowerUpsByFn(index: number, powerUp: PowerUp): string {
    return powerUp.name;
  }
}
