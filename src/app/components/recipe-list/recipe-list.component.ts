import { Component } from '@angular/core';
import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[];

  recipe_in_progress: Recipe;

  use_dark_background: boolean;

  constructor() {

    this.recipe_in_progress = Recipe.createBlank();

    this.use_dark_background = false;

    this.recipes = [
      new Recipe('Banana Bread',
        'This is my favourite banana bread recipe! My mother taught me how to make this one warm summer afternoon',
        4, 60, null, null, null),
      new Recipe('Homstead Tofu',
        'This is a dish from rural Hunan province in China and has tofu, some flavouring, and lots of chili peppers',
        4, 30, null, null, null),
      new Recipe('Yangzhou Fried Rice',
        'This is a popular fried rice from Fujian province with eggs, sausage, and onions. It\'s quick and delicious',
        2, 15, null, null, null),
    ];
  }

  public addRecipeClicked() {
    console.log(JSON.stringify(this.recipe_in_progress, null, 2));
    this.recipes.unshift(this.recipe_in_progress);
    this.recipe_in_progress = Recipe.createBlank();
  }

  public zoomInOnRecipe(recipe) {
    console.log('The user click on a recipe');
    console.log(JSON.stringify(recipe, null, 2));
  }

  public toggleBackground() {
    this.use_dark_background = !this.use_dark_background;
  }

}
