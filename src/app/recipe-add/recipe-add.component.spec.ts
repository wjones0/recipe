/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdInputModule,
    MdMenuModule,
} from '@angular/material';
import 'hammerjs';

import { RecipeAddComponent } from './recipe-add.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { FooterComponent } from '../footer/footer.component';

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';
import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';

import { RouterLinkStubDirective, ActivatedRouteStub, RouterStub } from '../shared/testing/routerstubs';
import { Firemocksvc } from '../shared/testing/firemock';
import { RecipeServiceMock } from '../shared/recipe-service/recipe.service.mock';
import { click } from '../shared/testing/click';

describe('RecipeAddComponent', () => {
    let component: RecipeAddComponent;
    let fixture: ComponentFixture<RecipeAddComponent>;

    let saveSpy: jasmine.Spy;

    let actrt = new ActivatedRouteStub();
    actrt.testParams = {
        id: "hiheyhi"
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MdButtonModule,
                MdInputModule,
                MdMenuModule,
            ],
            declarations: [
                RecipeAddComponent,
                TopnavComponent,
                FooterComponent,
                RouterLinkStubDirective,
            ],
            providers: [
                { provide: RecipeService, useClass: RecipeServiceMock },
                { provide: ActivatedRoute, useValue: actrt },
                { provide: Router, useClass: RouterStub },
                { provide: UserprofilesService, useClass: UserProfileServiceMock },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeAddComponent);
        component = fixture.componentInstance;

        let recsvc = fixture.debugElement.injector.get(RecipeService);
        saveSpy = spyOn(recsvc, 'addRecipe').and.returnValue(Promise.resolve({ key: "thenewkeyeyey" }));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should have places to enter main recipe things", () => {
        let des = fixture.debugElement.queryAll(By.css('input'));

        expect(des[0].nativeElement.placeholder).toContain("Recipe Title");
        expect(des[1].nativeElement.placeholder).toContain("Image");
        expect(des[2].nativeElement.placeholder).toContain("Yield");
        expect(des[3].nativeElement.placeholder).toContain("Time");

    });

    it("should have the ability to add ingredients", () => {
        let de = fixture.debugElement.query(By.css('.add-ing'));

        expect(component.recipe.ingredients.length).toBe(0);

        click(de.nativeElement);

        expect(component.recipe.ingredients.length).toBe(1);
    });

    it("should have the ability to add recipe steps", () => {
        let de = fixture.debugElement.query(By.css('.add-step'));

        expect(component.recipe.steps.length).toBe(0);

        click(de.nativeElement);

        expect(component.recipe.steps.length).toBe(1);
    });

    it("should have a cancel button that doesn't save", () => {
        let de = fixture.debugElement.query(By.css('.cancel-btn'));
        let route = de.injector.get(RouterLinkStubDirective);

        expect(route.navigatedTo).toBeNull;

        click(de.nativeElement);

        expect(route.navigatedTo).toBe('/recipes');

    });

    it("should have a save button that saves and routes to the new recipe", inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigate');

        // add a step
        let de = fixture.debugElement.query(By.css('.add-step'));
        click(de.nativeElement);
        fixture.detectChanges();
        expect(component.recipe.steps.length).toBe(1);

        // add an ing
        de = fixture.debugElement.query(By.css('.add-ing'));
        click(de.nativeElement);
        fixture.detectChanges();
        expect(component.recipe.ingredients.length).toBe(1);

        // click the save
        de = fixture.debugElement.query(By.css('.save-btn'));

        fixture.detectChanges();


        click(de.nativeElement);
        fixture.whenStable().then(() => {
            const navArgs = spy.calls.first().args[0];
            expect(navArgs[0]).toBe('/recipe/thenewkeyeyey');
        });
    }));
});
