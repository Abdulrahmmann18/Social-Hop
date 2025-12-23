import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-all-posts',
  imports: [],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss',
})
export class AllPostsComponent implements OnInit {
  

  private postsService : PostsService = inject(PostsService);

  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe({
      next : (res) => {
        console.log(res);
      }
    }) 
  }
}
