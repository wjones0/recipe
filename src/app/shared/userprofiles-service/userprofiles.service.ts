import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

@Injectable()
export class UserprofilesService {

  private uid: string;
  private picture: string;
  private authSub: Subscription;

  private _authed = new BehaviorSubject<any>(null);
  public authed = this._authed.asObservable();

  constructor(private _af: AngularFire) {
    this.authSub = this._af.auth.subscribe((value) => {
      if (value) {
        this.uid = value.uid;
        this.picture = value.auth.photoURL;

        this._af.database.object('/users/' + this.uid).map(res => res).subscribe((value) => {
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
    this._af.auth.login();
  }

  logout() {
    this._af.auth.logout();
  }

  saveProfile(profile: any) {
    // need to update other places too eventually
    if (profile.username) {
      this._af.database.object('/users/' + this.uid).set(profile.username);
    }
  }

}
