import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { OnePost } from '../../interfaces/onePost/one-post';

@Component({
  selector: 'app-all-posts',
  imports: [],
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
