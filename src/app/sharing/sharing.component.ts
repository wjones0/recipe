import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { SharingService } from '../shared/sharing-service/sharing.service';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnInit {

  private sharedWithMe: Observable<any>;
  private iSharedWith: Observable<any>;

  dialogRef: MdDialogRef<ShareDialogComponent>;

  private showDelete: boolean = false;

  constructor(private _sharing: SharingService, public dialog: MdDialog, private _router: Router) {
    this.sharedWithMe = this._sharing.getSharedWithMe();
    this.iSharedWith = this._sharing.getISharedWith();
  }

  ngOnInit() {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(ShareDialogComponent, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._sharing.sharewith(result);
      }
      this.dialogRef = null;
    });
  }

  delete(person) {
    this._sharing.revokeShare(person.$key);
  }

  viewShare(person) {
    this._router.navigate(['/recipes', { id: person.$key }]);
  }

}
