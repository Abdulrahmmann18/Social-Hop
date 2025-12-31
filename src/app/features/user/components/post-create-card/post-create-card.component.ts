import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserData } from '../../interfaces/userData/user-data.interface';

@Component({
  selector: 'app-post-create-card',
  imports: [RouterLink],
  templateUrl: './post-create-card.component.html',
  styleUrl: './post-create-card.component.scss',
})
export class PostCreateCardComponent {

  @Input({ required: true }) userInfo : WritableSignal<UserData> = signal<UserData>({} as UserData);
  @Output() open : EventEmitter<void> = new EventEmitter<void>();
}
