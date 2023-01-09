import { Injectable } from "@angular/core";
import { User } from "../interfaces";

@Injectable()
export class UserService {
  public users: User[] = JSON.parse(localStorage.getItem('users')) || [];
}