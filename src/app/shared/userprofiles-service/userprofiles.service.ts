import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UserprofilesService {

  private uid: string;
  private picture: string;
  private authSub: Subscription;

  private _authed = new BehaviorSubject<any>(null);
  public authed = this._authed.asObservable();

  constructor(private _af: AngularFireAuth, private _db: AngularFireDatabase) {
    this.authSub = this._af.authState.subscribe((value) => {
      if (value) {
        this.uid = value.uid;
        this.picture = value.photoURL;

        this._db.object('/users/' + this.uid).subscribe((value) => {
          if (value.$value) {
            this._authed.next({
              uid: this.uid,
              username: value.$value,
              picture: this.picture,
              profile: true
            });
          }
          else {
            this._authed.next({
              uid: this.uid,
              picture: this.picture,
              profile: false
            });
          }
        });
      }
      else {
        this._authed.next(null);
      }
    });
  }

  login() {
    this._af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this._af.auth.signOut();
  }

  saveProfile(profile: any) {
    // need to update other places too eventually
    if (profile.username) {
      this._db.object('/users/' + this.uid).set(profile.username);
    }
  }

  finduser(username: string): Observable<any> {
    const queryObservable = this._db.list('/users', {
      query: {
        orderByValue: true,
        equalTo: username
      }
    });
    return queryObservable;
  }

}
