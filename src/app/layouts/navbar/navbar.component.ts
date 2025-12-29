import { UserData } from './../../features/user/interfaces/userData/user-data.interface';
import { UserService } from './../../features/user/services/user/user.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  private flowbiteService : FlowbiteService = inject(FlowbiteService)
  private userService : UserService = inject(UserService)
  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData)  

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.userService.getLoggedUserData().subscribe(
      (res) => {
        this.userInfo.set(res.user);         
      }
    )
    this.userService.userInfo.subscribe(
      () => {
        this.userInfo.set(this.userService.userInfo.getValue());
      }
    )
  }

  isSidebarOpen : WritableSignal<boolean> = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
