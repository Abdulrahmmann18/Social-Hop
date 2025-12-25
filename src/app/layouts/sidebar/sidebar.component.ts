import { Component, Input, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isSidebarOpen : WritableSignal<boolean> = signal<boolean>(false)

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
