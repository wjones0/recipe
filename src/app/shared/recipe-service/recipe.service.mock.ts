import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipeServiceMock {

    private uid: string;
    private authSub: Subscription;

    private _authed = new BehaviorSubject<boolean>(false);
    public authed = this._authed.asObservable();

    constructor() {
        this._authed.next(true);
    }

    newRec = {
        key: "thenewkey"
    };

    addRecipe(recipe) {
        return Promise.resolve(this.newRec);
    }

    getRecipes(): any {
        return new Observable((observer) => {
            observer.next([{
                "image": "https://s3.amazonaws.com/pp-test-img/elk-c.png",
                "time": "1.5 hr",
                "title": "Chicken Tortilla Soup",
                "yield": "1 pot",
                $key: 'key1',
                childKey: 'ckey1'
            },
            {
                "image": "https://s3.amazonaws.com/pp-test-img/tuna-c.png",
                "time": "1.5 hrs",
                "title": "Chili",
                "yield": "1 pot",
                $key: 'key2',
                childKey: 'ckey2'
            },
            {
                "image": "",
                "time": "1hr",
                "title": "Red Curry Thai Noodles",
                "yield": "2 bowls",
                $key: 'key3',
                childKey: 'ckey3'
            }]

            );
            observer.complete();
        });
    }

    getRecipe(id: string) {
        return new Observable((observer) => {
            observer.next({
                $key: "somerandomkey",
                "image": "https://s3.amazonaws.com/pp-test-img/elk-c.png",
                "ingredients": ["1 onion, chopped", "3 cloves garlic, minced", "1 tablespoon olive oil", "2 teaspoons chili powder", "1 teaspoon dried cumin", "1 (28 ounce) can crushed tomatoes", "28-32oz chicken broth", "1 can whole corn kernels", "1 can white hominy", "2 (7 ounce) can chopped green chile peppers", "1 (15 ounce) can black beans, rinsed and drained", "1/4 cup chopped fresh cilantro", "2 boneless chicken breast halves, cooked and cut into bite-sized pieces", "Sharp Cheddar Cheese"],
                "steps": ["In a medium stock pot, heat oil over medium heat. Saute onion and garlic in oil until soft.", "Stir in chili powder, cumin, tomatoes, broth, and water.", "Bring to a boil, and simmer for 5 to 10 minutes.", "Stir in corn, hominy, chiles, beans, cilantro, and chicken. Simmer for 1 hour.", "Ladle soup into individual serving bowls, and top with cheese."],
                "time": "1.5 hr",
                "title": "Chicken Tortilla Soup",
                "yield": "1 pot"
            }
            );
            observer.complete();
        });
    }

    updateRecipe(recipe) {
    }

    deleteRecipe(recipe) {
    }

}
