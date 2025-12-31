import { UserData } from './../../interfaces/userData/user-data.interface';
import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-create-modal',
  imports: [FormsModule],
  templateUrl: './post-create-modal.component.html',
  styleUrl: './post-create-modal.component.scss',
})
export class PostCreateModalComponent {

  postForm : FormData = new FormData();
  postContent: string = '';
  fileIsSelected : WritableSignal<boolean> = signal<boolean>(false);

  private postsService : PostsService = inject(PostsService);
  private toastrService : ToastrService = inject(ToastrService);
  
  @Input({ required: true }) userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);

  @Output() close : EventEmitter<void> = new EventEmitter<void>();


  captureImage(eInfo : Event)
  {
    const targetInput : HTMLInputElement = eInfo.target as HTMLInputElement;
    if (targetInput.files) {
      this.postForm.set("image", targetInput.files[0]);
      this.fileIsSelected.set(true);
      this.postContent = '';     
    }
  }

  craetePost()
  {
    this.postForm.set("body", this.postContent);   
    // call createPost API
    this.postsService.createPost(this.postForm).subscribe(
      (res) => {
        this.toastrService.success(res.message);
        this.close.emit();
      }
    )
  }
}
