import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { OnePost } from '../../interfaces/onePost/one-post.interface';
import { UserData } from '../../interfaces/userData/user-data.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {

  /* Inputs */
  @Input({ required: true }) postData!: OnePost;
  @Input({ required: true }) userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);
  @Input({ required: true }) commentsCount!: number;

  /* Outputs */
  @Output() openLayer  : EventEmitter<void> = new EventEmitter<void>();
  @Output() deletePost : EventEmitter<void> = new EventEmitter<void>();
  @Output() setFormForUpdate : EventEmitter<void> = new EventEmitter<void>();

  menuOpen: WritableSignal<boolean> = signal(false);
  imageOpened: WritableSignal<boolean> = signal(false);

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  toggleImage() {
    this.imageOpened.set(!this.imageOpened());
  }

}
