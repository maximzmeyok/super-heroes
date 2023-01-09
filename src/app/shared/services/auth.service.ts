import { Injectable } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { LoginData, User } from '../interfaces';
import { UserService } from "./user.services";

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
  ) {}

  public checkLoginData(loginData: LoginData): boolean {
    let isWrongLoginData: boolean = true;

    this._userService.users.forEach((user: User): void => {
      const isRightEmailAndPassword: boolean = user.email === loginData.email && user.password === loginData.password;

      if (isRightEmailAndPassword) {
        isWrongLoginData = false;
      }
    });

    return isWrongLoginData;
  }

  public register(user: User): void {
    this._userService.users.push(user);

    const users: string = JSON.stringify(this._userService.users);

    localStorage.setItem('users', users);
  }
}