import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { OnePost } from '../../interfaces/onePost/one-post';
import { OnePostComponent } from "../one-post/one-post.component";

@Component({
  selector: 'app-all-posts',
  imports: [OnePostComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss',
})
export class AllPostsComponent implements OnInit {
  

  private postsService : PostsService = inject(PostsService);

  allPosts : WritableSignal<OnePost[]> = signal<OnePost[]>([])
  
  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe({
      next : (res) => {
        // console.log(res);
        this.allPosts.set(res.posts);
        console.log(this.allPosts());
        
      }
    }) 
  }
}
