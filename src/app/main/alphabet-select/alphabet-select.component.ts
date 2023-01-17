import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet-select',
  templateUrl: './alphabet-select.component.html',
  styleUrls: ['./alphabet-select.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetSelectComponent {
  @Output() public onLetterClick: EventEmitter<string> = new EventEmitter<string>();

  public alphabet: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  public searchByLetter(letter: string): void {
    this.onLetterClick.emit(letter);
  }

  public trackLettersByFn(index: number, item: string): string {
    return item;
  }
}
