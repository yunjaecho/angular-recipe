import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../model/recipe";
import {ParamMap, ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common'
import {RecipeService} from "../../services/recipe.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  recipes: Recipe[];

  load_error: boolean;

  error_text: string;

  // Dependence injection
  constructor(private route: ActivatedRoute, private location: Location, private recipe_service: RecipeService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const recipe_id = parseInt(params.get('recipe_id'), 10);
      this.recipe_service.getRecipeById(recipe_id)
        .then((recipe) => this.recipe = recipe)
        .catch((err) => {
          this.load_error = true;
          const body = JSON.parse(err._body);
          this.error_text = body.message;
        });
      ;
    });
  }

  /*findRecipeById(id: number): Recipe {
    console.log("id : " + id);
    for(const recipe of this.recipes) {
      if (recipe.id === id) {
        return recipe;
      }
    }

    return null;
  }*/

  goBackButtonPressed(): void {
    this.location.back();
  }

  imageUrl(img: string, defimg?: string): string {
    if (!img && defimg) {
      return defimg;
    }
    return RecipeService.imageUrl(img);
  }


}
