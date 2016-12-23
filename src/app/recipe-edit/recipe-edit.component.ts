import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ThemeService } from '../shared/theme-service/theme.service';
import { RecipeService } from '../shared/recipe-service/recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

    private routeSub: Subscription;

    private checkingIngredients: boolean = false;
    private recipeID: string;

    private recipe;

    private theme: string;
    private themeSub: Subscription;

    constructor(private _route: ActivatedRoute, private _recipeService: RecipeService, private _router: Router, private _themeService: ThemeService) { }

    ngOnInit() {
        this.routeSub = this._route.params.subscribe(params => {
            this.recipeID = decodeURI(params['id']);
            this._recipeService.getRecipe(this.recipeID).subscribe((value) => {
                this.recipe = value;
            });
        });

        this.themeSub = this._themeService.theme.subscribe((value) => {
            this.theme = value;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.themeSub.unsubscribe();
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    save() {
        this._recipeService.updateRecipe(this.recipe);
        this._router.navigate(['/recipe/' + this.recipe.$key]);
    }

}
