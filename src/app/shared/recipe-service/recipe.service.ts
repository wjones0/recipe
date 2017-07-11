import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class RecipeService {

    private uid: string;
    private authSub: Subscription;

    public activeID: string;
    public guest: boolean;

    private _authed = new BehaviorSubject<boolean>(false);
    public authed = this._authed.asObservable();

    constructor(private _af: AngularFireAuth, private _db: AngularFireDatabase) {
        this.authSub = this._af.authState.subscribe((value) => {
            if (value) {
                this.uid = value.uid;
                this.activeID = this.uid;
                this.guest = false;
                this._authed.next(true);
            }
            else {
                this._authed.next(false);
            }
        });
    }

    addRecipe(recipe) {
        // variable to save the header key
        let headerkey: string = '';
        return this.addRecipeHeader(recipe).then((header) => {
            // added header - get key
            recipe.headerKey = header.key;
            headerkey = header.key;

            // push the child with the header key as an added field
            return this._db.list('/' + this.uid + "/recipes/").push(recipe);
        }).then((child) => {
            // update the header with the child key after we added - and return the child back
            this._db.object('/' + this.uid + "/recipe-headers/" + headerkey).update({
                childKey: child.key
            });
            return Promise.resolve(child);
        });
    }

    addRecipeHeader(recipe) {
        return this._db.list('/' + this.uid + "/recipe-headers").push({
            title: recipe.title,
            yield: recipe.yield,
            time: recipe.time,
            image: recipe.image
        });
    }

    getRecipes(): any {
        if (this.activeID == null)
            this.activeID = this.uid;

        return this._db.list('/' + this.activeID + "/recipe-headers", {
            query: {
                orderByChild: 'title',
            }
        });
    }

    getRecipe(id: string) {
        if (this.activeID == null)
            this.activeID = this.uid;

        return this._db.object('/' + this.activeID + "/recipes/" + id);
    }

    updateRecipe(recipe) {
        this._db.object('/' + this.uid + "/recipes/" + recipe.$key).update({
            title: recipe.title,
            yield: recipe.yield,
            time: recipe.time,
            image: recipe.image,
            ingredients: recipe.ingredients,
            steps: recipe.steps
        });
        this._db.object('/' + this.uid + "/recipe-headers/" + recipe.headerKey).update({
            title: recipe.title,
            yield: recipe.yield,
            time: recipe.time,
            image: recipe.image,
        });
    }

    deleteRecipe(recipe) {
        this._db.object('/' + this.uid + "/recipe-headers/" + recipe.$key).remove();
        this._db.object('/' + this.uid + "/recipes/" + recipe.childKey).remove();
    }

}
