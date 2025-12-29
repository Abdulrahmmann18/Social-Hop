import { Component, Input, signal, WritableSignal } from '@angular/core';
import { oneComment } from '../../interfaces/oneComment/one-comment.interface';
import { OneCommentComponent } from "../one-comment/one-comment.component";

@Component({
  selector: 'app-all-comments',
  imports: [OneCommentComponent],
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.scss',
})
export class AllCommentsComponent {
  @Input() allComments : WritableSignal<oneComment[]> = signal<oneComment[]>([]);
}
