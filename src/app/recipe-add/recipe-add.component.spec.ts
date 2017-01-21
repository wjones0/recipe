/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFire } from 'angularfire2';
import { DragulaModule } from 'ng2-dragula';
import 'hammerjs';

import { RecipeAddComponent } from './recipe-add.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { FooterComponent } from '../footer/footer.component';

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { ThemeService } from '../shared/theme-service/theme.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';
import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';

import { RouterLinkStubDirective, ActivatedRouteStub, RouterStub } from '../shared/testing/routerstubs';
import { Firemocksvc } from '../shared/testing/firemock';
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
                MaterialModule.forRoot(),
                FormsModule,
                DragulaModule
            ],
            declarations: [
                RecipeAddComponent,
                TopnavComponent,
                FooterComponent,
                RouterLinkStubDirective,
            ],
            providers: [
                RecipeService,
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
        let des = fixture.debugElement.queryAll(By.css('md-input'));

        expect(des[0].nativeElement.innerHTML).toContain("Recipe Title");
        expect(des[1].nativeElement.innerHTML).toContain("Image");
        expect(des[2].nativeElement.innerHTML).toContain("Yield");
        expect(des[3].nativeElement.innerHTML).toContain("Time");

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

    it("should have a save button that saves and routes to the new recipe", () => {
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
        let route = de.injector.get(Router);

        fixture.detectChanges();

        expect(route.navigatedTo).toBeNull;

        click(de.nativeElement);
        fixture.whenStable().then(() => {
            expect(route.navigatedTo).toEqual(['/recipe/thenewkeyeyey']);
        });
    });
});
