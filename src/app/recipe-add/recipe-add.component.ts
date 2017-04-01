import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../shared/recipe-service/recipe.service';

@Component({
    selector: 'app-recipe-add',
    templateUrl: './recipe-add.component.html',
    styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

    recipe = {
        title: "",
        yield: "",
        time: "",
        image: "",
        ingredients: [],
        steps: []
    }

    constructor(private _recipeService: RecipeService, private _router: Router) { }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    save() {
        this._recipeService.addRecipe(this.recipe).then((item) => {
            this._router.navigate(['/recipe/' + item.key]);
        });
    }

}
