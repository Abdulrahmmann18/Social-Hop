import { Component } from '@angular/core';
import { AllPostsComponent } from '../../components/all-posts/all-posts.component';

@Component({
  selector: 'app-home',
  imports: [AllPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
