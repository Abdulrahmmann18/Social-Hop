import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { UserData } from '../../interfaces/userData/user-data.interface';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CommentsService } from '../../services/comments/comments.service';
import { ToastrService } from 'ngx-toastr';
import { commentForm } from '../../interfaces/oneComment/one-comment.interface';
import { OnePost } from '../../interfaces/onePost/one-post.interface';

@Component({
  selector: 'app-comment-create',
  imports: [FormsModule],
  templateUrl: './comment-create.component.html',
  styleUrl: './comment-create.component.scss',
})
export class CommentCreateComponent {

  ngOnInit(): void {
    this.getLoggedUserData();
    this.userService.userInfo.subscribe(
      () => {
        this.userInfo.set(this.userService.userInfo.getValue());
      }
    )
  }

  private userService : UserService = inject(UserService);
  private commentsService : CommentsService = inject(CommentsService);
  private toastrService : ToastrService = inject(ToastrService);

  @Output() postIsCreated : EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Input() postData : OnePost = {} as OnePost;

  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);
  commentContent : string = '';

  getLoggedUserData()
  {
    this.userService.getLoggedUserData().subscribe(
      (res) => {
        this.userInfo.set(res.user);         
      }
    )
  }

  createComment(comment : commentForm)
  {
    this.commentsService.createComment(comment).subscribe(
      (res) => {
        this.toastrService.success(res.message);
        this.commentContent = '';
        this.postIsCreated.emit(true);
      }
    )
  }

  addComment()
  {
    const comment : commentForm = {
      'content' : this.commentContent,
      'post' : this.postData._id
    }; 
    this.createComment(comment);
  }
}
