import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { ThemeService } from '../shared/theme-service/theme.service';

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

    private theme: string;
    private themeSub: Subscription;

    constructor(private _recipeService: RecipeService, private _router: Router, private _themeService: ThemeService) { }

    ngOnInit() {
        this.themeSub = this._themeService.theme.subscribe((value) => {
            this.theme = value;
        });
    }

    ngOnDestroy() {
        this.themeSub.unsubscribe();
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
