import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { OnePost } from '../../interfaces/onePost/one-post.interface';
import { OnePostComponent } from "../../components/one-post/one-post.component";

@Component({
  selector: 'app-profile-page',
  imports: [OnePostComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {

  private postsService : PostsService = inject(PostsService);

  userPosts : WritableSignal<OnePost[]> = signal<OnePost[]>([])
  
  ngOnInit(): void {
    this.postsService.getUserPosts().subscribe({
      next : (res) => {
        this.userPosts.set(res.posts);     
      }
    }) 
  }
}
