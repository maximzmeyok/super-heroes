import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.services';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentSearchComponent {
  @Input() public recentSearch: string;
  @Output() public onSearchClick: EventEmitter<string> = new EventEmitter<string>();

  public isVisibleDelete: boolean = false;

  constructor(
    private _userService: UserService,
  ) {}

  public searchFromRecent(recentSearch: string): void {
    this.onSearchClick.emit(recentSearch);
  }

  public deleteSearch(recentSearch: string): void {
    this._userService.deleteRecentSearch(recentSearch);
  }
  
  public toggleDeleteButton() {
    this.isVisibleDelete = !this.isVisibleDelete;
  }
}
