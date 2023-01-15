import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginData, User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  public form: FormGroup;
  public message: string;

  public get emailControl(): AbstractControl {
    return this.form.get('email');
  }

  public get passwordControl(): AbstractControl {
    return this.form.get('password');
  }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this._checkQueryParams();
    this._initForm();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData: User = this.form.value;
    const loginData: LoginData = {
      email: formData.email,
      password: formData.password,
    };
    const isWrongLoginData: boolean = this._authService.checkLoginData(loginData);

    if (isWrongLoginData) {
      return;
    }

    this.form.reset();
    this._router.navigate(['main', 'selection']);
  }

  private _checkQueryParams(): void {
    this._activatedRoute.queryParams.subscribe((params: Params): void => {
      if (params.loginOrRegister) {
        this.message = 'Please login or sign up to use this app!';
      }

      if (params.loginAgain) {
        this.message = 'Your current session has expired. Please login again to continue using this app!';
      }
    });
  }

  private _initForm(): void {
    this.form = this._fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
    });
  }
}
