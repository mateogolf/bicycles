import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowseComponent } from './browse/browse.component';
import { BicyclesComponent } from './bicycles/bicycles.component';
import { NewComponent } from './bicycles/new/new.component';
import { EditListComponent } from './bicycles/edit-list/edit-list.component';
import { DayComponent } from './day/day.component';
import { RegComponent } from './reg/reg.component';
import {BicycleService} from './bicycle.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BrowseComponent,
    BicyclesComponent,
    NewComponent,
    EditListComponent,
    DayComponent,
    RegComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		FormsModule,
    HttpModule
  ],
  providers: [BicycleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
