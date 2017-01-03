import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProfileServiceMock {

    private uid: string;
    private authSub: Subscription;

    private _authed = new BehaviorSubject<any>(null);
    public authed = this._authed.asObservable();

    constructor() {
        this._authed.next({
            uid: 'hihihi',
            username: 'nameymcnameface',
            picture: 'picto',
            profile: true
        });
    }

    deauth() {
        this._authed.next({
            uid: this.uid,
            profile: false
        })
    }

}
