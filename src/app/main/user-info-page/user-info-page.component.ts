import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoPageComponent {
  public currentTap: string = 'heroesList';

  public showHeroesList(): void {
    this.currentTap = 'heroesList';
  }

  public showBattlesHistory(): void {
    this.currentTap = 'battlesHistory';
  }

  public showPowerUps(): void {
    this.currentTap = 'powerUps';
  }
}
