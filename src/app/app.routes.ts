import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];


export const publicRoutes: string[] = ['/', '/register'];
export const privateRoutes: string[] = ['/dashboard'];
