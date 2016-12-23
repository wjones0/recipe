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

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { ThemeService } from '../shared/theme-service/theme.service';

import { RouterLinkStubDirective, ActivatedRouteStub, RouterStub } from '../shared/testing/routerstubs';
import { RecipeServiceMock } from '../shared/recipe-service/recipe.service.mock';
import { Firemocksvc } from '../shared/testing/firemock';

describe('RecipeEditComponent', () => {
    let component: RecipeAddComponent;
    let fixture: ComponentFixture<RecipeAddComponent>;

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
                RouterLinkStubDirective,
            ],
            providers: [
                { provide: RecipeService, useClass: RecipeServiceMock },
                ThemeService,
                { provide: AngularFire, useClass: Firemocksvc },
                { provide: ActivatedRoute, useValue: actrt },
                { provide: Router, useClass: RouterStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
