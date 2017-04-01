import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';

@Component({
    selector: 'rec-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit, OnDestroy {

    auth: any;
    private authSub: Subscription;


    constructor(private _userService: UserprofilesService) { }

    ngOnInit() {
        this.authSub = this._userService.authed.subscribe((value) => {
            this.auth = value;
        });

    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
    }

    login() {
        this._userService.login();
    }

    logout() {
        this._userService.logout();
    }

}
