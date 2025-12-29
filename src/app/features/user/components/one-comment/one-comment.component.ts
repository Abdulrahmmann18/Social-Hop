import { Component, Input } from '@angular/core';
import { oneComment } from '../../interfaces/oneComment/one-comment.interface'
import { DatePipe, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-one-comment',
  imports: [DatePipe],
  templateUrl: './one-comment.component.html',
  styleUrl: './one-comment.component.scss',
})
export class OneCommentComponent {
  @Input() commentData : oneComment = {} as oneComment;
}
