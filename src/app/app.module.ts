import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeListingComponent } from './recipe-listing/recipe-listing.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';

import { RecipeService } from './recipe-service/recipe.service';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyDujc6Q4UXh19oZgu9GnaO-v6yvlIiuUXM',
    authDomain: 'recipes-5da71.firebaseapp.com',
    databaseURL: 'https://recipes-5da71.firebaseio.com',
    storageBucket: 'recipes-5da71.appspot.com'
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};

@NgModule({
    declarations: [
        AppComponent,
        RecipeListingComponent,
        RecipeDetailComponent,
        TopnavComponent,
        RecipeEditComponent,
        RecipeAddComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        MaterialModule.forRoot(),
    ],
    providers: [
        RecipeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
