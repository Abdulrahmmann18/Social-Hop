import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { OnePost } from '../../interfaces/onePost/one-post.interface';
import { UserData } from '../../interfaces/userData/user-data.interface';

@Component({
  selector: 'app-profile-header',
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {

  private userService : UserService = inject(UserService);
  private toastrService : ToastrService = inject(ToastrService);

  isOpen : WritableSignal<boolean> = signal<boolean>(false);
  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData) 
  profilePhotoForm : FormData = new FormData();
  
  ngOnInit(): void {
    this.getLoggedUserData();
    this.userService.userInfo.subscribe(
      () => {
        this.userInfo.set(this.userService.userInfo.getValue());
      }
    )
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
        this.getLoggedUserData();
      }
    )
  }
}
