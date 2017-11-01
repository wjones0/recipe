/* tslint:disable:no-unused-variable */
import { } from 'jasmine';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
} from '@angular/material';
import 'hammerjs';

import { RecipeListingComponent } from './recipe-listing.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { FooterComponent } from '../footer/footer.component';

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';

import { RouterLinkStubDirective, ActivatedRouteStub, RouterStub } from '../shared/testing/routerstubs';
import { RecipeServiceMock } from '../shared/recipe-service/recipe.service.mock';
import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';
import { Firemocksvc } from '../shared/testing/firemock';
import { click } from '../shared/testing/click';

describe('RecipeListingComponent', () => {
  let component: RecipeListingComponent;
  let fixture: ComponentFixture<RecipeListingComponent>;
  let deletedsomething: string = '';
  let delSpy: jasmine.Spy;

  let actrt = new ActivatedRouteStub();
  actrt.testParams = {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
      ],
      declarations: [
        RecipeListingComponent,
        TopnavComponent,
        FooterComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: RecipeService, useClass: RecipeServiceMock },
        { provide: UserprofilesService, useClass: UserProfileServiceMock },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: actrt },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListingComponent);
    component = fixture.componentInstance;

    let recsvc = fixture.debugElement.injector.get(RecipeService);
    delSpy = spyOn(recsvc, 'deleteRecipe').and.callFake((recipe) => {
      deletedsomething = recipe.$key;
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list the recipes when authed', () => {
    fixture.whenStable().then(() => {
      let des = fixture.debugElement.queryAll(By.css('mat-card-title'));

      expect(des[0].nativeElement.textContent).toContain('Chicken Tortilla Soup');
      expect(des[1].nativeElement.textContent).toContain('Chili');
      expect(des[2].nativeElement.textContent).toContain('Red Curry Thai Noodle');
    });
  });

  it('should navigate to the recipe when clicked', () => {
    let des = fixture.debugElement.queryAll(By.css('mat-card-title-group'));

    let rlinksvc = des[1].injector.get(RouterLinkStubDirective);
    expect(rlinksvc.navigatedTo).toBeNull;

    click(des[1]);

    fixture.detectChanges();

    expect(rlinksvc.navigatedTo).toBe('/recipe/ckey2');
  });

  it('should show delete option when longpress', () => {
    let des = fixture.debugElement.queryAll(By.css('.del-fab'));

    expect(des.length).toBe(0);

    des = fixture.debugElement.queryAll(By.css('mat-card-title-group'));
    des[0].triggerEventHandler('longpress', null);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.css('.del-fab'));

    expect(des.length).toBe(3);

  });

  it('should have a delete function', () => {
    let des = fixture.debugElement.queryAll(By.css('mat-card-title-group'));
    des[0].triggerEventHandler('longpress', null);

    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.css('.del-fab'));

    click(des[1]);

    expect(deletedsomething).toBe('key2');
  });

  it('should navigate to profile page if no profile is present', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigate');

    let userservice = fixture.debugElement.injector.get(UserprofilesService);
    userservice.logout();


    fixture.whenStable().then(() => {
      const navArgs = spy.calls.first().args[0];
      expect(navArgs[0]).toBe('/settings');
    });
  }));

});

