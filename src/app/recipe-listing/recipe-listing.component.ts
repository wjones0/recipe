import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { RecipeService } from '../shared/recipe-service/recipe.service';
import { ThemeService } from '../shared/theme-service/theme.service';
import { UserprofilesService } from '../shared/userprofiles-service/userprofiles.service';

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

  constructor(private _recipeService: RecipeService, private _userService: UserprofilesService, private _themeService: ThemeService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.authSub = this._userService.authed.subscribe((value) => {
      // we have some sort of auth and a profile
      if (value && value.profile) {
        this.recipes = this._route.params.switchMap((params: Params) => {
          let selID = params['id'];
          if (selID) {
            this._recipeService.activeID = selID;
            this._recipeService.guest = true;
          }
          else {
            this._recipeService.activeID = null;
            this._recipeService.guest = false;
          }
          return this._recipeService.getRecipes();
        });
      }
      // we have auth but no profile
      else if (value) {
        this._router.navigate(['/settings']);
      }
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
