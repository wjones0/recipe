/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { TopnavComponent } from './topnav.component';
import { ThemeService } from '../shared/theme-service/theme.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';

import { UserProfileServiceMock } from '../shared/userprofiles-service/userprofiles.service.mock';
import { click } from '../shared/testing/click';

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
                { provide: UserprofilesService, useClass: UserProfileServiceMock },
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

    it('should display the users name', () => {
        let de = fixture.debugElement.query(By.css('button'));
        let el = de.nativeElement;

        expect(el.textContent).toContain('nameymcnameface');
    });

    it('should have a top menu with items on the username', () => {
        let de = fixture.debugElement.query(By.css('button'));

        let menuItems = fixture.debugElement.queryAll(By.css('.md-menu-content>button'));

        expect(menuItems.length).toBe(0);

        de.triggerEventHandler('click', null);

        fixture.whenStable().then(() => {
            menuItems = fixture.debugElement.queryAll(By.css('.md-menu-content>button'));

            expect(menuItems.length).toBe(3);

            expect(menuItems[0].nativeElement.textContent).toContain('Settings');
            expect(menuItems[1].nativeElement.textContent).toContain('Sharing');
            expect(menuItems[2].nativeElement.textContent).toContain('Logout');
        });
    });
});
