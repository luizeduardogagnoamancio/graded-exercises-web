import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './content/main/about/about.component';
import { ExercisesComponent } from './content/main/exercises/exercises.component';
import { VerbToBeComponent } from './content/main/exercises/verb-to-be/verb-to-be.component';
import { MainPageComponent } from './content/main/main-page/main-page.component';
import { MainComponent } from './content/main/main.component';
import { SideMenuComponent } from './content/side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { VerbToBeTypeCardComponent } from './content/main/exercises/verb-to-be-type-card/verb-to-be-type-card.component';




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
    VerbToBeTypeCardComponent,
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
    MatCheckboxModule,
    MatDividerModule,
    HttpClientModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
