import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../shared/form.validators';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;

  public get usernameControl(): AbstractControl {
    return this.form.get('username');
  }

  public get emailControl(): AbstractControl {
    return this.form.get('email');
  }

  public get passwordControl(): AbstractControl {
    return this.form.get('password');
  }

  public get repeatedPasswordControl(): AbstractControl {
    return this.form.get('repeatedPassword');
  }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this._initForm();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData: User = this.form.value;
    const user: User = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    this.form.reset();
    this._authService.register(user);
  }

  private _initForm(): void {
    this.form = this._fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(8),
        FormValidators.isValidUsername,
      ]],
      email: ['', [
        Validators.required,
        FormValidators.isValidEmail,
        FormValidators.isUniqueEmail,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        FormValidators.isValidPassword,
      ]],
      repeatedPassword: ['', [
        Validators.required,
        FormValidators.isRepeatedPassword,
      ]],
    });
  }
}
