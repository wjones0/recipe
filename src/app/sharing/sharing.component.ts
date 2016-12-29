import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SharingService } from '../shared/sharing-service/sharing.service';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnInit {

  private sharedWithMe: Observable<any>;
  private iSharedWith: Observable<any>;

  private showDelete: boolean = false;

  constructor(private _sharing: SharingService) {
    this.sharedWithMe = this._sharing.getSharedWithMe();
    this.iSharedWith = this._sharing.getISharedWith();
  }

  ngOnInit() {

  }

}
