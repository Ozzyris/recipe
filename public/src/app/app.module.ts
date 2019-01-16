import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//EXTERNAL PACKAGE

//VIEWS
import { AppComponent } from './app.component';
import { RecipesComponent } from './views/recipes/recipes.component';
import { RecipeComponent } from './views/recipe/recipe.component';
import { SanitizerPipe } from './pipes/sanitizer/sanitizer.pipe';

//PIPES

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, data: { title: 'Recipes' } },
  { path: '',   redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipe/:name', component: RecipeComponent, data: { title: 'Recipe' } }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeComponent,
    SanitizerPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
