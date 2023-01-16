import { Injectable } from "@angular/core";
import { CurrentUser, User } from "../interfaces";

@Injectable()
export class UserService {
  public users: User[] = JSON.parse(localStorage.getItem('users')) || [];
  public currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  public recentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches')) || [];

  public refreshRecentSearches(searchValue: string): void {
    const isOldSearch: boolean = this.recentSearches.includes(searchValue);

    if (isOldSearch) {
      return;
    }

    this.recentSearches.push(searchValue);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  public deleteRecentSearch(recentSearch: string): void {
    this.recentSearches = this.recentSearches.filter((item: string) => item !== recentSearch);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }
}