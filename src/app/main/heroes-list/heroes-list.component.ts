import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent {

}
