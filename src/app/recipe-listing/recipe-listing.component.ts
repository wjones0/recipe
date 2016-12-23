import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../shared/recipe-service/recipe.service';
import { ThemeService } from '../shared/theme-service/theme.service';

@Component({
  selector: 'app-recipe-listing',
  templateUrl: './recipe-listing.component.html',
  styleUrls: ['./recipe-listing.component.css']
})
export class RecipeListingComponent implements OnInit, OnDestroy {

  private recipes: Observable<any>;
  private authSub: Subscription;

  private theme: string;
  private themeSub: Subscription;

  private showDelete: boolean = false;

  constructor(private _recipeService: RecipeService, private _themeService: ThemeService) { }

  ngOnInit() {
    this.authSub = this._recipeService.authed.subscribe((value) => {
      if (value)
        this.recipes = this._recipeService.getRecipes();
    });

    this.themeSub = this._themeService.theme.subscribe((value) => {
      this.theme = value;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.themeSub.unsubscribe();
  }

  delete(recipe) {
    this._recipeService.deleteRecipe(recipe);
  }

}
