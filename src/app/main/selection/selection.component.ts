import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterEvent } from '@angular/router';
import { FormValidators } from 'src/app/shared/form.validators';
import { ApiResponse, Hero } from 'src/app/shared/interfaces';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { UserService } from 'src/app/shared/services/user.services';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionComponent implements OnInit {
  public form: FormGroup;
  public isVisibleAlphabet: boolean = false;
  public alphabetButtonLetter: string = 'A';
  public message: string;
  public searchingMssage: string;

  public get searchControl(): AbstractControl {
    return this.form.get('search');
  }

  public get hasResults(): boolean {
    return !!this._heroesService.foundHeroes.length;
  }

  public get foundHeroes(): Hero[] {
    return this._heroesService.foundHeroes;
  }

  public get hasRecentSearches(): boolean {
    return !!this._userService.recentSearches.length;
  }

  public get recentSearches(): string[] {
    return this._userService.recentSearches;
  }

  constructor(
    private _fb: FormBuilder,
    private _heroesService: HeroesService,
    private _cd: ChangeDetectorRef,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
    this._checkQueryParams();;
    this._initRouter();
    this._initForm();
  }

  public submit(): void {
    const searchValue: string = this.form.value.search;

    this._heroesService.getHeroes(searchValue).subscribe((apiResponse: ApiResponse): void => {
      const clearedResponse: Hero[] = apiResponse.results ? this._heroesService.filterHeroes(apiResponse.results) : [];

      if (!clearedResponse.length) {
        this.searchingMssage = 'Nothing was found. Try to enter another request!';
        this._cd.markForCheck();
        return;
      }

      this.searchingMssage = '';
      this._userService.refreshRecentSearches(searchValue);
      this._heroesService.foundHeroes = clearedResponse;
      this._cd.markForCheck();
    });
  }

  public searchFromRecent(search: string): void {
    this.searchControl.setValue(search);
    this.submit();
  }

  public toggleAlphabet(): void {
    this.isVisibleAlphabet = !this.isVisibleAlphabet;
  }

  public searchByLetter(letter: string): void {
    this.alphabetButtonLetter = letter;
    this.toggleAlphabet();
    this.searchControl.setValue(letter);
    this.submit();
  }

  public trackHeroesByFn(index: number, hero: Hero): string {
    return hero.id;
  }

  public trackSearchesByFn(index: number, item: string): string {
    return item;
  }

  private _initForm(): void {
    this.form = this._fb.group({
      search: ['', [
        Validators.required,
        FormValidators.isValidHeroname,
      ]],
    });
  }

  private _initRouter(): void {
    this._router.events.subscribe((event: RouterEvent): void => {
      const isNavigationEnd: boolean = event instanceof NavigationEnd;

      if (!isNavigationEnd) {
        return;
      }

      const hasSelectedHero: boolean = !event.url.endsWith('hasNotSelectedHero=true');
      const isSelectionPage: boolean = event.url.endsWith('selection');

      if (hasSelectedHero && !isSelectionPage) {
        return;
      }

      if (isSelectionPage) {
        this.message = '';
      }

      this._cd.markForCheck();
    });
  }

  private _checkQueryParams(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.hasNotSelectedHero) {
        this.message = "You don't have any heroes to fight! Please, choose heroes here and go fight!";
      }
    });
  }
}
