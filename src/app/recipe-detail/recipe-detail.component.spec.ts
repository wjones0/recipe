/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

import { RecipeDetailComponent } from './recipe-detail.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { FooterComponent } from '../footer/footer.component';

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';
import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';
import { RouterLinkStubDirective, ActivatedRouteStub, RouterStub } from '../shared/testing/routerstubs';
import { RecipeServiceMock } from '../shared/recipe-service/recipe.service.mock';
import { Firemocksvc } from '../shared/testing/firemock';
import { click } from '../shared/testing/click';

describe('RecipeEditComponent', () => {
    let component: RecipeDetailComponent;
    let fixture: ComponentFixture<RecipeDetailComponent>;

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
                RecipeDetailComponent,
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
        fixture = TestBed.createComponent(RecipeDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the recipe', () => {
        let el: Element = fixture.debugElement.nativeElement;

        expect(el.innerHTML).toContain('Chicken Tortilla Soup');
        expect(el.innerHTML).toContain('1 onion, chopped');
        expect(el.innerHTML).toContain('1 teaspoon dried cumin');
        expect(el.innerHTML).toContain('Saute onion and garlic');
        expect(el.innerHTML).toContain('Ladle soup into individual serving bowls');
        expect(el.innerHTML).toContain('1.5 hr');
        expect(el.innerHTML).toContain('1 pot');
    });

    it('should have an edit button that routes to the edit screen', () => {
        let de = fixture.debugElement.query(By.css('.fab'));

        let routerLink = de.injector.get(RouterLinkStubDirective);
        expect(routerLink.navigatedTo).toBeNull;

        click(de);

        expect(routerLink.navigatedTo).toBe('/edit/hiheyhi');
    });
});
