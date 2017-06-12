import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../shared/recipe-service/recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

    private routeSub: Subscription;

    public checkingIngredients: boolean = false;
    public recipeID: string;

    public recipe;

    private stepsDone: boolean[];

    constructor(private _route: ActivatedRoute, public _recipeService: RecipeService) { }

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
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
