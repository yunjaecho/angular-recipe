import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeSummaryComponent } from './components/recipe-summary/recipe-summary.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { EditNewRecipeComponent } from './components/edit-new-recipe/edit-new-recipe.component';
import { HttpModule } from '@angular/http';

import { RecipeService } from './services/recipe.service';
import {SwearingPipe} from "./misc/swearing.pipe";
import {HighlightNewRecipeDirective} from "./misc/highlightnewrecipe.directive";

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeSummaryComponent,
    RecipeDetailsComponent,
    EditNewRecipeComponent,
    SwearingPipe,
    HighlightNewRecipeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'recipe',
        component: RecipeListComponent
      },
      {
        path: '',
        redirectTo: '/recipe',
        pathMatch: 'full'
      },
      {
        path: 'recipe/:recipe_id',
        component: RecipeDetailsComponent
      },
      {
        path: 'editnewrecipe',
        component: EditNewRecipeComponent
      }
    ]),
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
