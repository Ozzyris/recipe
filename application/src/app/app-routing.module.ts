import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'recipes', pathMatch: 'full' },
  	{ path: 'recipes', loadChildren: () => import('./views/recipes/recipes.module').then( m => m.RecipesPageModule) },
	{ path: 'recipe', loadChildren: () => import('./views/recipe/recipe.module').then( m => m.RecipePageModule) },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})

export class AppRoutingModule {}
