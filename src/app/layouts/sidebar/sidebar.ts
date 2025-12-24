import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() isSidebarOpen : WritableSignal<boolean> = signal<boolean>(false)

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
