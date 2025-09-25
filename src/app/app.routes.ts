import { LayoutComponent } from './modules/layout/layout.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterSuccessComponent } from './pages/register-success/register-success.component';
import { LoginComponent } from './pages/login/login.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { ExercisePageComponent } from './pages/exercise-page/exercise-page.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: 'home', component: HomeComponent },
      // { path: 'exercises', component: ExercisesComponent },

      // Redireciona a rota vazia para 'home'
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'exercises/:chapterId', component: ExercisePageComponent }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'home' }
];
