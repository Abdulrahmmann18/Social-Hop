import { ToastrService } from 'ngx-toastr';
import { PostsService } from './../../services/posts/posts.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../interfaces/userData/user-data.interface';
import { FormsModule } from "@angular/forms";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, RouterLink],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent implements OnInit {

  postForm : FormData = new FormData();
  isOpen : WritableSignal<boolean> = signal<boolean>(false);
  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);
  postContent : string = "";

  private userService : UserService = inject(UserService);
  private postsService : PostsService = inject(PostsService);
  private toastrService : ToastrService = inject(ToastrService);

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

  captureImage(eInfo : Event)
  {
    const targetInput : HTMLInputElement = eInfo.target as HTMLInputElement;
    if (targetInput.files) {
      this.postForm.set("image", targetInput.files[0])     
    }
  }

  craetePost()
  {
    this.postForm.set("body", this.postContent);   
    // call createPost API
    this.postsService.createPost(this.postForm).subscribe(
      (res) => {
        this.toastrService.success(res.message);
        this.closeModal();
      }
    )

  }
}
