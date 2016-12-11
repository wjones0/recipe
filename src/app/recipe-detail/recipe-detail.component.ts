import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ThemeService } from '../theme-service/theme.service';
import { RecipeService } from '../recipe-service/recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

    private routeSub: Subscription;

    private checkingIngredients: boolean = false;
    private recipeID: string;

    private recipe;

    private theme: string;
    private themeSub: Subscription;

    private stepsDone: boolean[];

    constructor(private _route: ActivatedRoute, private _recipeService: RecipeService, private _themeService: ThemeService) { }

    ngOnInit() {
        this.routeSub = this._route.params.subscribe(params => {
            this.recipeID = decodeURI(params['id']);
            this._recipeService.getRecipe(this.recipeID).subscribe((value) => {
                this.recipe = value;

                this.stepsDone = [];
                for (let r of this.recipe.steps) {
                    this.stepsDone.push(false);
                }
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

}
