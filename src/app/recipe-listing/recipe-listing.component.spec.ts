/* tslint:disable:no-unused-variable */
import { } from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFire } from 'angularfire2';
import 'hammerjs';

import { RecipeListingComponent } from './recipe-listing.component';
import { TopnavComponent } from '../topnav/topnav.component';

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { ThemeService } from '../shared/theme-service/theme.service';

import { RouterLinkStubDirective } from '../shared/testing/routerstubs';
import { RecipeServiceMock } from '../shared/recipe-service/recipe.service.mock';
import { Firemocksvc } from '../shared/testing/firemock';

describe('RecipeListingComponent', () => {
  let component: RecipeListingComponent;
  let fixture: ComponentFixture<RecipeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule.forRoot()
      ],
      declarations: [
        RecipeListingComponent,
        TopnavComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: RecipeService, useClass: RecipeServiceMock },
        ThemeService,
        { provide: AngularFire, useClass: Firemocksvc }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

