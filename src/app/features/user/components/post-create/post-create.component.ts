import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../interfaces/userData/user-data.interface';
import { FormsModule } from "@angular/forms";
import { RouterLink } from '@angular/router';
import { PostCreateCardComponent } from "../post-create-card/post-create-card.component";
import { PostCreateModalComponent } from "../post-create-modal/post-create-modal.component";

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, RouterLink, PostCreateCardComponent, PostCreateModalComponent],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent implements OnInit {

  postForm : FormData = new FormData();
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
