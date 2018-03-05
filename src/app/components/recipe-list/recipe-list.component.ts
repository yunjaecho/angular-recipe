import { Component, OnInit } from '@angular/core';

import { } from '@angular/router';

import { Recipe } from '../../model/recipe';
import {Router} from "@angular/router";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  recipe_in_progress: Recipe;

  current_classes: any;

  current_style: any;

  font_size: string;

  recipes_loaded: boolean;

  constructor(private router: Router, private recipe_service: RecipeService) {

    this.recipe_in_progress = Recipe.createBlank();

    this.current_classes = {'darkbg':false};

    this.current_style = {'font-size' : '150%'}

    this.font_size = '150%';
  }

  ngOnInit(): void {
    this.recipe_service.getAllRecipes()
      .then((recipes) => {
        this.recipes = recipes;
        this.recipes_loaded = true;
      });
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
    const newValue = !this.current_classes['darkbg'];
    this.current_classes = {'darkbg': newValue};
    //this.current_classes = !this.current_classes;
  }

  public toggleFontSize() {
    if (this.current_style['font-size'] === '150%') {
      this.font_size = '175%';
    } else {
      this.font_size = '150%';
    }
  }

  userClickedOnRecipe(recipe_id): void {
    this.router.navigateByUrl('/recipe/' + recipe_id);
  }


  addNewRecipeProgress(): void {
    this.router.navigateByUrl('/editnewrecipe');
  }


}
