import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { oneComment } from '../../interfaces/oneComment/one-comment.interface';
import { OnePost } from '../../interfaces/onePost/one-post.interface';
import { DatePipe } from '@angular/common';
import { AllCommentsComponent } from "../all-comments/all-comments.component";
import { CommentCreateComponent } from "../comment-create/comment-create.component";

@Component({
  selector: 'app-post-layer',
  imports: [DatePipe, AllCommentsComponent, CommentCreateComponent],
  templateUrl: './post-layer.component.html',
  styleUrl: './post-layer.component.scss',
})
export class PostLayerComponent {

  /* Inputs */
  @Input({ required: true }) postData!: OnePost;
  @Input({ required: true }) postComments : WritableSignal<oneComment[]> = signal<oneComment[]>([])

  /* Outputs */
  @Output() close = new EventEmitter<void>();
  @Output() commentAdded = new EventEmitter<void>();
}
