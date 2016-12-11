import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'rec-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit, OnDestroy {

  private auth: FirebaseAuthState;
  private authSub: Subscription;

  constructor(private _af: AngularFire) { }

  ngOnInit() {
    this.authSub = this._af.auth.subscribe((value) => {
      this.auth = value;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  login() {
    this._af.auth.login();
  }

  logout() {
    this._af.auth.logout();
  }

}
