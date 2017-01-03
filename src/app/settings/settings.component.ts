import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  profile: any;
  profileSub: Subscription;
  username: string
  editing: boolean = false;

  constructor(private _userService: UserprofilesService) {
    this.profileSub = this._userService.authed.subscribe((value) => {
      this.profile = value;
      if (value)
        this.username = value.username;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }

  save() {
    this._userService.saveProfile({ username: this.username });
    this.editing = false;
  }

}
