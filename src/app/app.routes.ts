import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { USER_ROUTES } from './features/user/user.routes';

export const routes: Routes = [
    {path : "", redirectTo : "auth", pathMatch : "full"},
    ...AUTH_ROUTES,
    ...USER_ROUTES
];
