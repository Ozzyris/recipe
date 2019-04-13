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

//PIPES
import { SanitizerPipe } from './pipes/sanitizer/sanitizer.pipe';
import { SearcherPipe } from './pipes/searcher/searcher.pipe';

//DIRECTIVE
import { LoginModalDirective } from './directives/login_modal/login-modal.directive';
import { TestComponent } from './views/test/test.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, data: { title: 'Recipes' } },
  { path: '',   redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipe/:url', component: RecipeComponent, data: { title: 'Recipe' } }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeComponent,
    TestComponent,
    SanitizerPipe,
    SearcherPipe,
    LoginModalDirective,
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
