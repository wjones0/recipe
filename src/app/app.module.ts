import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule
} from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeListingComponent } from './recipe-listing/recipe-listing.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { SharingComponent } from './sharing/sharing.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';

import { RecipeService } from './shared/recipe-service/recipe.service';
import { SharingService } from './shared/sharing-service/sharing.service';
import { UserprofilesService } from './shared/userprofiles-service/userprofiles.service';
import { SettingsComponent } from './settings/settings.component';
import { FooterComponent } from './footer/footer.component';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDujc6Q4UXh19oZgu9GnaO-v6yvlIiuUXM",
    authDomain: "recipes-5da71.firebaseapp.com",
    databaseURL: "https://recipes-5da71.firebaseio.com",
    projectId: "recipes-5da71",
    storageBucket: "recipes-5da71.appspot.com",
    messagingSenderId: "335803175021"
};

@NgModule({
    declarations: [
        AppComponent,
        RecipeListingComponent,
        RecipeDetailComponent,
        TopnavComponent,
        RecipeEditComponent,
        RecipeAddComponent,
        SharingComponent,
        ShareDialogComponent,
        SettingsComponent,
        FooterComponent
    ],
    entryComponents: [
        ShareDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    providers: [
        RecipeService,
        SharingService,
        UserprofilesService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
