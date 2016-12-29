import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharingServiceMock {

    private uid: string;

    constructor() {
    }

    getSharedWithMe() {
        return new Observable((observer) => {
            observer.next([
                { "$value": "hansel", "$key": "abvdefg" },
                { "$value": "gretel", "$key": "zxyv" }
            ]

            );
            observer.complete();
        });
    }

    getISharedWith() {
        return new Observable((observer) => {
            observer.next([
                { "$value": "hretta", "$key": "adsfdsf" },
                { "$value": "gretta", "$key": "fdafda" }
            ]

            );
            observer.complete();
        });
    }

}
