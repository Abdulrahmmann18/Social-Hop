import { Component } from '@angular/core';
import { AllPostsComponent } from '../../components/all-posts/all-posts.component';
import { PostCreateComponent } from '../../components/post-create/post-create.component';


@Component({
  selector: 'app-home',
  imports: [AllPostsComponent, PostCreateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
 
}
