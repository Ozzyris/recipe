import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'recipes', pathMatch: 'full' },
	{ path: 'home', loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)},
  	{ path: 'recipes', loadChildren: () => import('./views/recipes/recipes.module').then( m => m.RecipesPageModule)
  },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})

export class AppRoutingModule {}
