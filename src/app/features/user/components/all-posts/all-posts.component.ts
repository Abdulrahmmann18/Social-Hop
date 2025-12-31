import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { OnePostComponent } from "../one-post/one-post.component";
import { OnePost } from '../../interfaces/onePost/one-post.interface';

@Component({
  selector: 'app-all-posts',
  imports: [OnePostComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss',
})
export class AllPostsComponent implements OnInit {
  
  ngOnInit(): void {
    this.getAllPosts();
  }
  
  private postsService : PostsService = inject(PostsService);

  allPosts : WritableSignal<OnePost[]> = signal<OnePost[]>([])
  


  getAllPosts()
  {
    this.postsService.getAllPosts().subscribe({
      next : (res) => {
        this.allPosts.set(res.posts);       
      }
    }) 
  }
}
