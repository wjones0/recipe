import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ThemeService } from '../shared/theme-service/theme.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';

@Component({
    selector: 'rec-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit, OnDestroy {

    private auth: any;
    private authSub: Subscription;

    private theme: string;
    private themeSub: Subscription;

    private themeSel: string;

    constructor(private _userService: UserprofilesService, private _themeService: ThemeService) { }

    ngOnInit() {
        this.authSub = this._userService.authed.subscribe((value) => {
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
        this._userService.login();
    }

    logout() {
        this._userService.logout();
    }

    select(e) {
        this._themeService.select(e);
    }

}
