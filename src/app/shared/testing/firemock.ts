import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Firemocksvc {
    private _auth: BehaviorSubject<any> = new BehaviorSubject<any>({ uid: 'hihihi' });
    public auth = this._auth.asObservable();
}