import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipe-service/recipe.service';

@Component({
  selector: 'app-recipe-listing',
  templateUrl: './recipe-listing.component.html',
  styleUrls: ['./recipe-listing.component.css']
})
export class RecipeListingComponent implements OnInit, OnDestroy {

  private recipes: Observable<any>;
  private authSub: Subscription;

  constructor(private _recipeService: RecipeService) { }

  ngOnInit() {
    this.authSub = this._recipeService.authed.subscribe((value) => {
      if (value)
        this.recipes = this._recipeService.getRecipes();
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
