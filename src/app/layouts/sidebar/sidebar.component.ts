import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isSidebarOpen : WritableSignal<boolean> = signal<boolean>(false)

  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }
}
