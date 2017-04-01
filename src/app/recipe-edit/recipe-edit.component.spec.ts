/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFire } from 'angularfire2';
import 'hammerjs';

import { RecipeEditComponent } from './recipe-edit.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { FooterComponent } from '../footer/footer.component';

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { ThemeService } from '../shared/theme-service/theme.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';
import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';
import { RouterLinkStubDirective, ActivatedRouteStub, RouterStub } from '../shared/testing/routerstubs';
import { RecipeServiceMock } from '../shared/recipe-service/recipe.service.mock';
import { Firemocksvc } from '../shared/testing/firemock';

import { click } from '../shared/testing/click';

describe('RecipeEditComponent', () => {
    let component: RecipeEditComponent;
    let fixture: ComponentFixture<RecipeEditComponent>;

    let saveSpy: jasmine.Spy;

    let actrt = new ActivatedRouteStub();
    actrt.testParams = {
        id: "hiheyhi"
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule.forRoot(),
                FormsModule,
            ],
            declarations: [
                RecipeEditComponent,
                TopnavComponent,
                FooterComponent,
                RouterLinkStubDirective,
            ],
            providers: [
                { provide: RecipeService, useClass: RecipeServiceMock },
                ThemeService,
                { provide: AngularFire, useClass: Firemocksvc },
                { provide: ActivatedRoute, useValue: actrt },
                { provide: Router, useClass: RouterStub },
                { provide: UserprofilesService, useClass: UserProfileServiceMock },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeEditComponent);
        component = fixture.componentInstance;

        let recsvc = fixture.debugElement.injector.get(RecipeService);
        saveSpy = spyOn(recsvc, 'updateRecipe').and.returnValue(Promise.resolve({ key: "thenewkeyeyey" }));

        fixture.detectChanges();
    });

    it("should have places to enter main recipe things", () => {
        let des = fixture.debugElement.queryAll(By.css('input'));

        expect(des[0].nativeElement.placeholder).toContain("Recipe Title");
        expect(des[1].nativeElement.placeholder).toContain("Image");
        expect(des[2].nativeElement.placeholder).toContain("Yield");
        expect(des[3].nativeElement.placeholder).toContain("Time");

    });

    it('should show the recipe', () => {
        let el: Element = fixture.debugElement.nativeElement;

        expect(el.innerHTML).toContain('Chicken Tortilla Soup');
        expect(el.innerHTML).toContain('1 onion, chopped');
        expect(el.innerHTML).toContain('1 teaspoon dried cumin');
        expect(el.innerHTML).toContain('In a medium stock pot');
        expect(el.innerHTML).toContain('Ladle soup into individual');
        expect(el.innerHTML).toContain('1.5 hr');
        expect(el.innerHTML).toContain('1 pot');
    });

    it("should have the ability to add ingredients", () => {
        let de = fixture.debugElement.query(By.css('.add-ing'));

        let l = component.recipe.ingredients.length;

        click(de.nativeElement);

        expect(component.recipe.ingredients.length).toBe(l + 1);
    });

    it("should have the ability to add recipe steps", () => {
        let de = fixture.debugElement.query(By.css('.add-step'));

        let l = component.recipe.steps.length;

        click(de.nativeElement);

        expect(component.recipe.steps.length).toBe(l + 1);
    });

    it("should have a cancel button that doesn't save", () => {
        let de = fixture.debugElement.query(By.css('.cancel-btn'));
        let route = de.injector.get(RouterLinkStubDirective);

        expect(route.navigatedTo).toBeNull;

        click(de.nativeElement);

        expect(route.navigatedTo).toBe('/recipe/hiheyhi');

    });

    it("should have a save button that saves and routes to the new recipe", inject([Router], (router: Router) => {
        const spy = spyOn(router, 'navigate');

        // click the save
        let de = fixture.debugElement.query(By.css('.save-btn'));
        let route = de.injector.get(Router);

        fixture.detectChanges();

        click(de.nativeElement);
        fixture.whenStable().then(() => {
            const navArgs = spy.calls.first().args[0];
            expect(navArgs[0]).toBe('/recipe/somerandomkey');
        });
    }));
});
