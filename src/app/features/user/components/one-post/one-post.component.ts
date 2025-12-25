import { Component, Input, signal, WritableSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OnePost } from '../../interfaces/onePost/one-post.interface';

@Component({
  selector: 'app-one-post',
  imports: [DatePipe],
  templateUrl: './one-post.component.html',
  styleUrl: './one-post.component.scss',
})
export class OnePostComponent {

  @Input() postData : OnePost = {} as OnePost;
}
