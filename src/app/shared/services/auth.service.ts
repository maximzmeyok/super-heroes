import { Injectable } from "@angular/core";
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
      const isWrongEmailAndPassword: boolean = user.email !== loginData.email || user.password !== loginData.password;

      if (isWrongEmailAndPassword) {
        return;
      }

      this._setToken(loginData);
      isWrongLoginData = false;
    });

    return isWrongLoginData;
  }

  public register(user: User): void {
    this._userService.users.push(user);

    const users: string = JSON.stringify(this._userService.users);

    localStorage.setItem('users', users);
  }

  public isValidToken(): boolean {
    const expirationDate: number = this._userService.currentUser?.expirationDate;
    
    return expirationDate > Date.now();
  }

  public hasNotCurrentUser(): boolean {
    return !this._userService.currentUser;
  }

  private _setToken(loginData: LoginData): void {
    const tokenTime: number = 3600000;

    this._userService.currentUser = {
      ...loginData,
      expirationDate: Date.now() + tokenTime,
    }

    localStorage.setItem('currentUser', JSON.stringify(this._userService.currentUser));
  }
}