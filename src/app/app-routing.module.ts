import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeListingComponent } from './recipe-listing/recipe-listing.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { SharingComponent } from './sharing/sharing.component';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
    { path: 'recipes', component: RecipeListingComponent },
    { path: 'recipe/:id', component: RecipeDetailComponent },
    { path: 'edit/:id', component: RecipeEditComponent },
    { path: 'add', component: RecipeAddComponent },
    { path: 'sharing', component: SharingComponent },
    { path: 'settings', component: SettingsComponent },
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