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
                "ingredients": ["1 onion, chopped", "3 cloves garlic, minced", "1 tablespoon olive oil", "2 teaspoons chili powder", "1 teaspoon dried cumin", "1 (28 ounce) can crushed tomatoes", "28-32oz chicken broth", "1 can whole corn kernels", "1 can white hominy", "2 (7 ounce) can chopped green chile peppers", "1 (15 ounce) can black beans, rinsed and drained", "1/4 cup chopped fresh cilantro", "2 boneless chicken breast halves, cooked and cut into bite-sized pieces", "Sharp Cheddar Cheese"],
                "steps": ["In a medium stock pot, heat oil over medium heat. Saute onion and garlic in oil until soft.", "Stir in chili powder, cumin, tomatoes, broth, and water.", "Bring to a boil, and simmer for 5 to 10 minutes.", "Stir in corn, hominy, chiles, beans, cilantro, and chicken. Simmer for 1 hour.", "Ladle soup into individual serving bowls, and top with cheese."],
                "time": "1.5 hr",
                "title": "Chicken Tortilla Soup",
                "yield": "1 pot",
                $key: 'key1'
            },
            {
                "image": "https://s3.amazonaws.com/pp-test-img/tuna-c.png",
                "ingredients": ["1 yellow onion - chopped", "1 green pepper - chopped", "1/2 lb ground turkey", "1/2 lb sweet italian sausage", "1 tbs ground cumin", "2 tbs chili powder", "1 28oz can whole tomatos", "1 14oz-ish can light kidney beans", "1 14oz-ish can dark kidney beans", "2 7oz cans roasted green chiles"],
                "steps": ["Brown the Meats.", "Heat onion and green pepper in a crock pot with a touch of olive oil until they soften", "Add the meat and the chiles to the pot - stir and cook for a few minutes", "Chop up tomatos in the can with a knife and add to the pot - chop up any larger pieces of tomato left", "Add the beans.", "Add the spices", "Cook until green peppers and onions aren't crunchy.  Serve with cornbread or grilled cheese sandwiches!"],
                "time": "1.5 hrs",
                "title": "Chili",
                "yield": "1 pot",
                $key: 'key2'
            },
            {
                "image": "",
                "ingredients": ["Peanut oil", "1/2 tbs minced garlic", "1 tbs red curry paste", "1 (normal) chicken breast", "1 cup coconut milk", "1 cup chicken broth", "1 tsp turmeric", "1 tbs soy sauce", "1/2 tsp sugar", "1/2 tsp salt", "1 tbs lime juice", "1/4 lb egg noodles", "1/3 cup chopped shallots", "1/3 cup chopped green onions", "1/3 cup chopped cilantro", "Crispy wanton strips", "A couple dried cayennes or other red chile, chopped"],
                "steps": ["Chop up the cilantro, green onions, and shallots and set aside.", "Cut up the chicken, season with salt and pepper.", "Heat the oil in a large pan over medium heat and add the garlic.", "Toss well and add the red curry paste mashing and stirring to soften, about 1 minute.", "Add the chicken and red chiles, mixing well with the curry paste.  Brown the chicken.", "Add the coconut milk, soy sauce, chicken broth and mix well.", "Add turmeric, salt, sugar and mix well.", "Cook the noodles!  With boiling water.", "Bring curry mixture to a simmer and cook until meat is cooked through", "When meat is cooked and sauce is slightly reduced, add the lime juice", "Serve in bowl over noodles.  Top with aromatics and wantons."],
                "time": "1hr",
                "title": "Red Curry Thai Noodles",
                "yield": "2 bowls",
                $key: 'key3'
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
