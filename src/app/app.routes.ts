import { LayoutComponent } from './modules/layout/layout.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: 'home', component: HomeComponent },
      // { path: 'exercises', component: ExercisesComponent },

      // Redireciona a rota vazia para 'home'
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', redirectTo: 'home' }
];
