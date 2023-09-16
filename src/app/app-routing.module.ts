import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesComponent } from './content/main/exercises/exercises.component';
import { AboutComponent } from './content/main/about/about.component';
import { MainPageComponent } from './content/main/main-page/main-page.component';
import { VerbToBeComponent } from './content/main/exercises/verb-to-be/verb-to-be.component';

const routes: Routes = [

  {path: '', component: MainPageComponent},
  {path: 'exercises', component: ExercisesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'exercises/verb-to-be', component: VerbToBeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
