/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AngularFire } from 'angularfire2';

import { TopnavComponent } from './topnav.component';
import { ThemeService } from '../shared/theme-service/theme.service';

import { Firemocksvc } from '../shared/testing/firemock';

describe('TopnavComponent', () => {
    let component: TopnavComponent;
    let fixture: ComponentFixture<TopnavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule.forRoot(),
                FormsModule,
            ],
            declarations: [TopnavComponent],
            providers: [
                { provide: AngularFire, useClass: Firemocksvc },
                ThemeService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopnavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
