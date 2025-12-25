import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UserLayoutComponent } from "../../layouts/user-layout/user-layout.component";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";

export const USER_ROUTES : Routes = [
    {path : "user", component : UserLayoutComponent, children : [
        {path : "", redirectTo : "home", pathMatch : "full"},
        {path : "home", component: HomeComponent, title : "Home"},
        {path : "changePassword", component: ChangePasswordComponent, title : "Change Password"},
    ]}

]