import { Route } from '@angular/router';
import { authGuard, authReverseGuard } from '@guards';

export const appRoutes: Route[] = [
  {
    path: 'todo',
    loadComponent: () => import('./pages/todo-page/todo-page.component').then(c => c.TodoPageComponent),
    canActivate: [authGuard],
    title: 'ToDo'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent),
    canActivate: [authReverseGuard],
    title: 'Login'
  },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: '**', redirectTo: '/todo' }
];
