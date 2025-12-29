import { commentForm, oneComment } from './../../interfaces/oneComment/one-comment.interface';
import { UserService } from './../../services/user/user.service';
import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OnePost } from '../../interfaces/onePost/one-post.interface';
import { AllCommentsComponent } from "../all-comments/all-comments.component";
import { UserData } from '../../interfaces/userData/user-data.interface';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments/comments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-one-post',
  imports: [DatePipe, AllCommentsComponent, FormsModule],
  templateUrl: './one-post.component.html',
  styleUrl: './one-post.component.scss',
})
export class OnePostComponent implements OnInit{
  ngOnInit(): void {
    this.userService.getLoggedUserData().subscribe(
      (res) => {
        this.userInfo.set(res.user);         
      }
    )
    this.userService.userInfo.subscribe(
      () => {
        this.userInfo.set(this.userService.userInfo.getValue());
      }
    )
    this.getPostComments(this.postData._id)
  }

  private userService : UserService = inject(UserService);
  private commentsService : CommentsService = inject(CommentsService);
  private toastrService : ToastrService = inject(ToastrService);

  @Input() postData : OnePost = {} as OnePost;
  imageisClicked : WritableSignal<boolean> = signal<boolean>(false);
  commentsisClicked : WritableSignal<boolean> = signal<boolean>(false);
  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);
  commentContent : string = '';
  postComments : WritableSignal<oneComment[]> = signal<oneComment[]>([]); 
  postCommentsNumber : WritableSignal<number> = signal<number>(0);

  toggleImage()
  {
    this.imageisClicked.set(!this.imageisClicked());
  }

  openPostLayer() {
    this.commentsisClicked.set(true);
    document.body.style.overflow = 'hidden';
  }
  
  closePostLayer() {
    this.commentsisClicked.set(false);
    document.body.style.overflow = 'auto';
  }

  createComment(comment : commentForm)
  {
    this.commentsService.createComment(comment).subscribe(
      (res) => {
        this.toastrService.success(res.message);
      }
    )
  }
  getPostComments(pId : string)
  {
    this.commentsService.getPostComments(pId).subscribe(
      (res) => {
        this.postComments.set(res.comments);
        this.postCommentsNumber.set(res.total);
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
    this.getPostComments(this.postData._id);
  }
}
