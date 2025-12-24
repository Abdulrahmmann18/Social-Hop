import { Routes } from "@angular/router";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { AuthLayout } from "../../layouts/auth-layout/auth-layout";


export const AUTH_ROUTES : Routes = [
    { path : "auth", component : AuthLayout, children : [
        {path : "", redirectTo : "signin", pathMatch : "full"},
        {path : "signup", component: SignUpComponent, title : "Sign-Up"},
        {path : "signin", component: SignInComponent, title : "Sign-In"}
    ]}

]