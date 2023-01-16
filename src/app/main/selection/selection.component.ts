import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    const searchValue: string = this.form.value.search;

    this._heroesService.getHeroes(searchValue).subscribe((apiResponse: ApiResponse): void => {
      const responseStatus: string = apiResponse.response;

      if (responseStatus !== 'success') {
        return;
      }

      this._userService.refreshRecentSearches(searchValue);
      this._heroesService.foundHeroes = apiResponse.results;
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

  private _initForm(): void {
    this.form = this._fb.group({
      search: ['', [
        Validators.required,
        FormValidators.isValidHeroname,
      ]],
    });
  }
}
