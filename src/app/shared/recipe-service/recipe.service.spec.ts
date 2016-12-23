/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipeService } from './recipe.service';

import { AngularFire } from 'angularfire2';
import { Firemocksvc } from '../testing/firemock';

describe('RecipeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AngularFire, useClass: Firemocksvc },
                RecipeService
            ]
        });
    });

    it('should ...', inject([RecipeService], (service: RecipeService) => {
        expect(service).toBeTruthy();
    }));
});
