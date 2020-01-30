import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

//PIPES
import { PipesModule } from "../../pipes/pipe.module";

//SERVICES
import { NetworkService } from '../../services/network/network.service';

//TEMPLATE
import { RecipesPage } from './recipes.page';

//COMPONENTS
import { ToasterComponent } from '../../components/toaster/toaster.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesPageRoutingModule,
    PipesModule,
  ],
  declarations: [
  	RecipesPage,
    ToasterComponent
  ],
  providers: [
    NetworkService
  ]
})
export class RecipesPageModule {}
