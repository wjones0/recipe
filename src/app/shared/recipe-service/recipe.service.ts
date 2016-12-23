import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

@Injectable()
export class RecipeService {

    private uid: string;
    private authSub: Subscription;

    private _authed = new BehaviorSubject<boolean>(false);
    public authed = this._authed.asObservable();

    constructor(private _af: AngularFire) {
        this.authSub = this._af.auth.subscribe((value) => {
            this.uid = value.uid;
            this._authed.next(true);
        });
    }

    addRecipe(recipe) {
        return this._af.database.list('/' + this.uid + "/recipes").push(recipe);
    }

    getRecipes(): any {
        return this._af.database.list('/' + this.uid + "/recipes");
    }

    getRecipe(id: string) {
        return this._af.database.object('/' + this.uid + "/recipes/" + id).map(res => res);
    }

    updateRecipe(recipe) {
        this._af.database.object('/' + this.uid + "/recipes/" + recipe.$key).update({
            title: recipe.title,
            yield: recipe.yield,
            time: recipe.time,
            image: recipe.image,
            ingredients: recipe.ingredients,
            steps: recipe.steps
        });
    }

    deleteRecipe(recipe) {
        this._af.database.object('/' + this.uid + "/recipes/" + recipe.$key).remove();
    }

}
