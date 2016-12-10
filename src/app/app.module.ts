import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    MaterialModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
