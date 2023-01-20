import { Injectable } from "@angular/core";
import { PowerUp } from "../interfaces";
import { POWER_UPS } from "../variables";

@Injectable()
export class PowerUpsService {

  public sortPowerUps(): PowerUp[] {
    return POWER_UPS.sort((a: PowerUp, b: PowerUp): number => this._compareValues(a.value, b.value));
  }

  public changePowerUps(uppedPowerstats: string[]): void {
    POWER_UPS.forEach((powerUp: PowerUp): void => {
      const isMatchedPowerstat: boolean = uppedPowerstats.includes(powerUp.powerstatName);

      if (!isMatchedPowerstat) {
        return;
      }

      powerUp.value--;
    })
  }

  private _compareValues(a: number, b: number): number {
    return b - a;
  }
}