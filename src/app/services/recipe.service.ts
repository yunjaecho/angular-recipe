import { Injectable } from '@angular/core';
import {Recipe} from "../model/recipe";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise'

const RECIPE_SERVER: string = "http://localhost:8080";

@Injectable()
export class RecipeService {

  // GET, PUT, POST, DELETE

  //recipes: Recipe[];

  constructor(private http: Http) {
  }

  /*getAllRecipes(): Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.recipes);
      }, 2000)
    });
  }*/

  getAllRecipes(): Promise<Recipe[]> {
    return this.http
      .get(RECIPE_SERVER + '/v1/recipes.json')
      .toPromise()
      .then(response => response.json().data as Recipe[])
      .catch(this.handleError);
  }

  /*getRecipeById(recipe_id: number): Promise<Recipe> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for(const recipe of this.recipes) {
          if (recipe.id === recipe_id) {
            resolve(recipe);
            return;
          }
        }
        reject(Error('No recipe exists with that ID.'));
      }, 2000);
    });
  }*/

  getRecipeById(recipe_id: number): Promise<Recipe> {
    return this.http
      .get(RECIPE_SERVER + `/v1/recipes/${recipe_id}.json`)
      .toPromise()
      .then(response => response.json().data as Recipe)
      .catch(this.handleError);
  }




  addNewRecipe(recipe: Recipe): Promise<Recipe> {
    return this.http
        .put(RECIPE_SERVER + '/v1/recipes.json', recipe)
        .toPromise()
        .then(response => response.json().data as Recipe)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR OCCURRED TALKING TO SERVER' + error);
    return Promise.reject(error.message || error);
  }

}
