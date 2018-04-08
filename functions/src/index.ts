import * as functions from 'firebase-functions';
import { DialogflowApp } from 'actions-on-google';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    console.log(JSON.stringify(request.body));
    let dialogApp = new DialogflowApp({ request, response });

    function ingredientList(app: DialogflowApp) {
        app.tell(`I see you want to know about ${app.getArgument('recipe_name')}`);
    }

    let actionMap = new Map();
    actionMap.set('IngredientList', ingredientList);

    dialogApp.handleRequest(actionMap);
});
