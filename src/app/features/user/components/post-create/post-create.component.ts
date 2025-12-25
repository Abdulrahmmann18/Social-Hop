import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../interfaces/userData/user-data.interface';

@Component({
  selector: 'app-post-create',
  imports: [],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent implements OnInit {

  isOpen : WritableSignal<boolean> = signal<boolean>(false);
  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);
  
  private userService : UserService = inject(UserService);

  ngOnInit(): void {
    this.userService.getLoggedUserData().subscribe(
      (res) => {
        this.userInfo.set(res.user);         
      }
    )
  }
  
  openModal() {
    this.isOpen.set(true);
  }
  closeModal() {
    this.isOpen.set(false);
  }
}
