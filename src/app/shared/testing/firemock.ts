import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Firemocksvc {
    private _auth: BehaviorSubject<any> = new BehaviorSubject<any>(
        {
            uid: 'hihihi',
            auth: {
                displayName: "nameymcnameface"
            }
        }
    );
    public auth = this._auth.asObservable();
}