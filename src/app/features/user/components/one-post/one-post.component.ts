import { UserService } from './../../services/user/user.service';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { OnePost } from '../../interfaces/onePost/one-post.interface';
import { UserData } from '../../interfaces/userData/user-data.interface';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments/comments.service';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from '../../services/posts/posts.service';
import { PostCardComponent } from "../post-card/post-card.component";
import { PostLayerComponent } from "../post-layer/post-layer.component";
import { oneComment } from '../../interfaces/oneComment/one-comment.interface';

@Component({
  selector: 'app-one-post',
  imports: [FormsModule, PostCardComponent, PostLayerComponent],
  templateUrl: './one-post.component.html',
  styleUrl: './one-post.component.scss',
})
export class OnePostComponent implements OnInit{
  ngOnInit(): void {
    this.postCommentsNumber.set(this.postData.comments.length);
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
  private postsService : PostsService = inject(PostsService);
  private commentsService : CommentsService = inject(CommentsService);
  private toastrService : ToastrService = inject(ToastrService);

  @Input() postData : OnePost = {} as OnePost;
  @Output() refreshPosts : EventEmitter<boolean> = new EventEmitter<boolean>(false);
  
  imageisClicked : WritableSignal<boolean> = signal<boolean>(false);
  commentsisClicked : WritableSignal<boolean> = signal<boolean>(false);
  userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);
  postComments : WritableSignal<oneComment[]> = signal<oneComment[]>([]); 
  postCommentsNumber : WritableSignal<number> = signal<number>(0);
  menuOpen  : WritableSignal<boolean> = signal<boolean>(false);

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

  getPostComments(pId : string)
  {
    this.commentsService.getPostComments(pId).subscribe(
      (res) => {
        this.postComments.set(res.comments);
        this.postCommentsNumber.set(res.total);
      }
    )
  }

  toggleMenu() 
  {
    this.menuOpen.set(!this.menuOpen());
  }

  deletePost()
  {
    this.postsService.deletePost(this.postData._id).subscribe(
      (res) => {
        this.toastrService.success(res.message);
        this.refreshPosts.emit(true);
      }
    )
  }

}
