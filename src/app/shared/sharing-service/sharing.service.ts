import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserprofilesService } from '../userprofiles-service/userprofiles.service';

@Injectable()
export class SharingService {

  private uid: string;
  private profile: any;

  constructor(private _userService: UserprofilesService, private _db: AngularFireDatabase) {
    this._userService.authed.subscribe((value) => {
      if (value) {
        this.uid = value.uid;
        this.profile = value;
      }
      else {
      }
    });
  }

  getSharedWithMe() {
    return this._db.list('/' + this.uid + "/shares");
  }

  getISharedWith() {
    return this._db.list('/' + this.uid + "/shared_with");
  }

  sharewith(person: string) {

    let sub = this._userService.finduser(person).subscribe((value) => {
      if (value && (value.length > 0)) {
        let sharewith = value[0];
        console.log(sharewith);

        this._db.object('/' + this.uid + "/shared_with/" + sharewith.$key).set(sharewith.$value);
        this._db.object('/' + sharewith.$key + "/shares/" + this.uid).set(this.profile.username);
      }
    });
  }

  revokeShare(personKey: string) {
    this._db.object('/' + this.uid + "/shared_with/" + personKey).remove();
    this._db.object('/' + personKey + "/shares/" + this.uid).remove();
  }

}
