import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UserLayout } from "../../layouts/user-layout/user-layout";

export const USER_ROUTES : Routes = [
    {path : "user", component : UserLayout, children : [
        {path : "", redirectTo : "home", pathMatch : "full"},
        {path : "home", component: HomeComponent, title : "Home"}
    ]}

]