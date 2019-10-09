import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//EXTERNAL PACKAGE
import { MomentModule } from 'angular2-moment';

//VIEWS
import { AppComponent } from './app.component';
import { RecipesComponent } from './views/recipes/recipes.component';
import { RecipeComponent } from './views/recipe/recipe.component';
import { AddRecipeComponent } from './views/add-recipe/add-recipe.component';

//PIPES
import { SanitizerPipe } from './pipes/sanitizer/sanitizer.pipe';
import { SearcherPipe } from './pipes/searcher/searcher.pipe';

//DIRECTIVE
import { LoginModalDirective } from './directives/login_modal/login-modal.directive';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, data: { title: 'Recipes' } },
  { path: 'add-recipe/:url', component: AddRecipeComponent, data: { title: 'Add recipes' } },
  { path: 'add-recipe', component: AddRecipeComponent, data: { title: 'Add recipes' } },
  { path: '',   redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipe/:url', component: RecipeComponent, data: { title: 'Recipe' } }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeComponent,
    SanitizerPipe,
    SearcherPipe,
    LoginModalDirective,
    AddRecipeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
