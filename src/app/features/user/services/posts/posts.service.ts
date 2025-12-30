import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  
  private httpClient : HttpClient = inject(HttpClient);

  getAllPosts() : Observable<any>
  {
    return this.httpClient.get(`${environment.baseURL}posts`);
  }
  getUserPosts() : Observable<any>
  {
    return this.httpClient.get(`${environment.baseURL}users/664bcf3e33da217c4af21f00/posts`);
  }
  createPost(postData : FormData) : Observable<any>
  {
    return this.httpClient.post(`${environment.baseURL}posts`, postData)
  }
  getSinglePost(pId : string) : Observable<any>
  {
    return this.httpClient.get(`${environment.baseURL}posts/${pId}`);
  }
  updatePost(pId : string, postData : FormData) : Observable<any>
  {
    return this.httpClient.put(`${environment.baseURL}posts/${pId}`, postData);
  }
  deletePost(pId : string) : Observable<any>
  {
    return this.httpClient.delete(`${environment.baseURL}posts/${pId}`);
  }
}
