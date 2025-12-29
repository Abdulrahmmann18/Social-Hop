import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { commentForm } from '../../interfaces/oneComment/one-comment.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private httpClient : HttpClient = inject(HttpClient);

  createComment(commentData : commentForm) : Observable<any>
  {
    return this.httpClient.post(`${environment.baseURL}comments`, commentData)
  }
  getPostComments(pId : string) : Observable<any>
  {
    return this.httpClient.get(`${environment.baseURL}posts/${pId}/comments`)
  }
}
