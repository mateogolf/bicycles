import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DayComponent } from './day/day.component';
import { BrowseComponent } from './browse/browse.component';
import { BicyclesComponent } from './bicycles/bicycles.component';

const routes: Routes = [
  {path:"",component:DayComponent},
  {path:"main",component: MainComponent,children:[
    {path:"browse",component:BrowseComponent},
    {path:"listings",component:BicyclesComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
