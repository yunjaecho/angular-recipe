import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../model/recipe";
import {RecipeService} from "../../services/recipe.service";
import {Router} from "@angular/router";
import { ReactiveFormsModule, AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  cover_photo_for_viewing:string = "/assets/emptybowl.jpg";
  instruction_photos_for_viewing: string[];

  cover_photo_for_upload: File;
  instruction_photos_for_upload: File[];

  recipe_in_progress: Recipe;

  recipeForm: FormGroup;

  constructor(private recipe_service: RecipeService, private router: Router) {
    this.recipe_in_progress = Recipe.createBlank();
    this.instruction_photos_for_viewing = [];
    this.instruction_photos_for_upload = [];
    this.buildFormGroup();
  }

  ngOnInit() {
  }

  buildFormGroup(): void {
    const fg = {
      'title' : new FormControl(this.recipe_in_progress.title, [Validators.required, noTunaCasseroleValidator()]),
      'description' : new FormControl(this.recipe_in_progress.description, [Validators.required]),
      'preparation_time' : new FormControl(this.recipe_in_progress.preparation_time, [Validators.required, Validators.min(1)]),
      'feeds_this_many' : new FormControl(this.recipe_in_progress.feeds_this_many,
        [Validators.required, Validators.min(1), Validators.max(1000)]),
    };

    for (let i = 0; i < this.recipe_in_progress.ingredients.length; i++) {
      fg['ingredient_' + i] = new FormControl(this.recipe_in_progress.ingredients[i].ingredient, [Validators.required]);
      fg['measure_' + i] = new FormControl(this.recipe_in_progress.ingredients[i].measure, [Validators.required]);
    }

    for (let i = 0; i < this.recipe_in_progress.instructions.length; i++) {
      fg['instruction_' + i] = new FormControl(this.recipe_in_progress.instructions[i].instruction, [Validators.required]);
    }

    this.recipeForm = new FormGroup(fg);
  }

  addIngredientPressed(): void {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [{ingredient: null, measure:null}];
    } else {
      this.recipe_in_progress.ingredients.push({ingredient: null, measure:null});
    }
    this.buildFormGroup();
  }

  removeIngredientAtIndex(index): void {
    this.recipe_in_progress.ingredients.splice(index, 1);
    this.buildFormGroup();
  }


  addInstructionPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [{instruction: null, photo:null}];
      this.instruction_photos_for_viewing = [];
      this.instruction_photos_for_upload = [];
    } else {
      this.recipe_in_progress.instructions.push({instruction: null, photo:null});
      this.instruction_photos_for_viewing.push(null);
      this.instruction_photos_for_upload.push(null);
    }

    console.log('instruction_photos_for_upload len : ' + this.instruction_photos_for_upload.length);
    this.buildFormGroup();
  }

  removeInstructionAtIndex(index): void {
    this.recipe_in_progress.instructions.splice(index, 1);
    this.instruction_photos_for_viewing.splice(index, 1);
    this.instruction_photos_for_upload.splice(index, 1);
    this.buildFormGroup();
  }

  addRecipeClicked(): void {
    this.recipe_service.addNewRecipe(this.recipe_in_progress, {
      cover_photo: this.cover_photo_for_upload,
      instruction_photos: this.instruction_photos_for_upload
    })
      .then((recipe) => {
        this.router.navigate(['recipe', recipe.id]);
      })
    ;
  }

  readUrl(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.cover_photo_for_viewing = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.cover_photo_for_upload = event.target.files[0];
    }
  }

  readInstdUrl(idex: number, event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.instruction_photos_for_viewing[idex] = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.instruction_photos_for_upload[idex] = event.target.files[0];
    }
  }




  /*validateForm(event): void {
    //console.log(JSON.stringify(event.target.value, null, 2));
    //console.log('feeds : ' + typeof (this.recipe_in_progress.feeds_this_many));
    //console.log('preptime : ' + typeof (this.recipe_in_progress.preparation_time));
    this.disable_add_recipe_button = true;

    if (!this.recipe_in_progress.title || this.recipe_in_progress.title.length < 1) {
      return;
    }
    if (!this.recipe_in_progress.description || this.recipe_in_progress.description.length < 1) {
      return;
    }

    const feeds = parseInt('' + this.recipe_in_progress.feeds_this_many, 10);
    if (isNaN(feeds) || feeds < 1 ||  feeds > 1000) {
      return;
    }

    const preptime = parseInt('' + this.recipe_in_progress.preparation_time, 10);
    if (isNaN(preptime) || preptime < 1) {
      return;
    }

    for(const ingr of this.recipe_in_progress.ingredients) {
      if (!ingr.ingredient || ingr.ingredient.length < 1) {
        return;
      }
      if (!ingr.measure || ingr.measure.length < 1) {
        return;
      }
    }

    console.log("ok.............");

    for(const instr of this.recipe_in_progress.instructions) {
      if (!instr.instruction || instr.instruction.length < 1) {
        return;
      }
    }

    this.disable_add_recipe_button = false;
  }*/

}

export function noTunaCasseroleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value.toLowerCase().indexOf('tuna') !== -1
      && control.value.toLowerCase().indexOf('casserole') !== -1) {
      return { 'noTunaCasserole': { value: control.value } };
    }

    return null;
  };
}
