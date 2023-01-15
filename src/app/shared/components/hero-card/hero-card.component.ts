import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Hero } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardComponent {
  @Input() public hero: Hero;

  public get isOwnedHero(): boolean {
    return this._heroesService.ownedHeroes.some((hero: Hero): boolean => hero.id === this.hero.id);
  }

  public get isSelectedHero(): boolean {
    return this._heroesService.selectedHero?.id === this.hero.id;
  }

  constructor(
    private _heroesService: HeroesService,
  ) {}

  public addToOwned(): void {
    this._heroesService.addToOwned(this.hero);
  }

  public removeFromOwned(): void {
    this._heroesService.removeFromOwned(this.hero);
  }
}
