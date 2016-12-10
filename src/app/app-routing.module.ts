import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListingComponent } from './recipe-listing/recipe-listing.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    { path: 'recipes', component: RecipeListingComponent },
    { path: 'recipe/:id', component: RecipeDetailComponent },
    { path: 'edit/:id', component: RecipeEditComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }