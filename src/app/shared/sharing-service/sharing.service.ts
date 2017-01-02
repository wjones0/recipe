import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

@Injectable()
export class SharingService {

  private uid: string;

  constructor(private _af: AngularFire) {
    this._af.auth.subscribe((value) => {
      if (value) {
        this.uid = value.uid;
        console.log(value);
      }
      else {
      }
    });
  }

  getSharedWithMe() {
    return this._af.database.list('/' + this.uid + "/shares");
  }

  getISharedWith() {
    return this._af.database.list('/' + this.uid + "/shared_with");
  }

  sharewith(person: string) {
    this._af.database.object('/' + this.uid + "/shared_with/" + person).set('will');
    this._af.database.object('/' + person + "/shares/" + this.uid).set('will');
  }

}
