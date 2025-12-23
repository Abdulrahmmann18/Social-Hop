import { Routes } from "@angular/router";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";


export const AUTH_ROUTES : Routes = [
    {path : "signup", component: SignUpComponent, title : "Sign-Up"},
    {path : "signin", component: SignInComponent, title : "Sign-In"},
]