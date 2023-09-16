import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { SideMenuComponent } from './content/side-menu/side-menu.component';
import { MainComponent } from './content/main/main.component';

import { AboutComponent } from './content/main/about/about.component';
import { ExercisesComponent } from './content/main/exercises/exercises.component';
import { MainPageComponent } from './content/main/main-page/main-page.component';
import { VerbToBeComponent } from './content/main/exercises/verb-to-be/verb-to-be.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    SideMenuComponent,
    MainComponent,
    ExercisesComponent,
    AboutComponent,
    MainPageComponent,
    VerbToBeComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
