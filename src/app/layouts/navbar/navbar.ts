import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [Sidebar, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  private flowbiteService : FlowbiteService = inject(FlowbiteService)

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  isSidebarOpen : WritableSignal<boolean> = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
