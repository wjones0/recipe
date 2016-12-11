import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThemeService {

  private _theme = new BehaviorSubject<string>('default');
  public theme = this._theme.asObservable();

  constructor() { }

  select(t: string) {
    this._theme.next(t);
  }

}
