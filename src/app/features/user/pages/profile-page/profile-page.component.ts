import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { OnePost } from '../../interfaces/onePost/one-post.interface';
import { OnePostComponent } from "../../components/one-post/one-post.component";
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../../interfaces/userData/user-data.interface';

@Component({
  selector: 'app-profile-page',
  imports: [OnePostComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {

  private postsService : PostsService = inject(PostsService);
  private userService : UserService = inject(UserService);
  private toastrService : ToastrService = inject(ToastrService);

  userPosts : WritableSignal<OnePost[]> = signal<OnePost[]>([])
  isOpen : WritableSignal<boolean> = signal<boolean>(false);
  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData) 
  profilePhotoForm : FormData = new FormData();
  
  ngOnInit(): void {
    this.getUserPosts();
    this.getLoggedUserData();
    this.userService.userInfo.subscribe(
      () => {
        this.userInfo.set(this.userService.userInfo.getValue());
      }
    )
  }

  getUserPosts()
  {
    this.postsService.getUserPosts().subscribe({
      next : (res) => {
        this.userPosts.set(res.posts);     
      }
    }) 
  }
  getLoggedUserData()
  {
    this.userService.getLoggedUserData().subscribe(
      (res) => {
        this.userInfo.set(res.user);   
        this.userService.userInfo.next(res.user);     
      }
    )
  }
  
  openModal() 
  {
    this.isOpen.set(true);
  }
  closeModal() 
  {
    this.isOpen.set(false);
  }

  captureImage(eInfo : Event)
  {
    const targetInput : HTMLInputElement = eInfo.target as HTMLInputElement;
    if (targetInput.files) {
      this.profilePhotoForm.set("photo", targetInput.files[0])     
    }
  }

  uploadProfilePhoto()
  {
    // call uploadProfilePhoto API
    this.userService.uploadProfilePhoto(this.profilePhotoForm).subscribe(
      (res) => {
        this.toastrService.success(res.message, "Upload Profile Picture!");
        this.closeModal();
        this.getUserPosts();
        this.getLoggedUserData();
      }
    )
  }
}
