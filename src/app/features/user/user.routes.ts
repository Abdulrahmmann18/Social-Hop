import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UserLayoutComponent } from "../../layouts/user-layout/user-layout.component";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";
import { authGuard } from "../../core/guards/auth/auth.guard";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";

export const USER_ROUTES : Routes = [
    { path : "user", canActivate : [authGuard], component : UserLayoutComponent, children : [
        {path : "", redirectTo : "home", pathMatch : "full"},
        {path : "home", component: HomeComponent, title : "Home"},
        {path : "changePassword", component: ChangePasswordComponent, title : "Change Password"},
        {path : "profilePage", component : ProfilePageComponent, title : "Profile Page"}
    ]}

]