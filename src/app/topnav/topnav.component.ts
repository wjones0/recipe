import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

import { ThemeService } from '../shared/theme-service/theme.service';

@Component({
    selector: 'rec-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit, OnDestroy {

    private auth: FirebaseAuthState;
    private authSub: Subscription;

    private theme: string;
    private themeSub: Subscription;

    private themeSel: string;

    constructor(private _af: AngularFire, private _themeService: ThemeService) { }

    ngOnInit() {
        this.authSub = this._af.auth.subscribe((value) => {
            this.auth = value;
        });

        this.themeSub = this._themeService.theme.subscribe((value) => {
            this.theme = value;
            this.themeSel = value;
        });
    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
        this.themeSub.unsubscribe();
    }

    login() {
        this._af.auth.login();
    }

    logout() {
        this._af.auth.logout();
    }

    select(e) {
        this._themeService.select(e);
    }

}
