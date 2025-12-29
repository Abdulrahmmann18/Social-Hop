import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { UserData } from '../../interfaces/userData/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient : HttpClient = inject(HttpClient);

  userInfo : BehaviorSubject<UserData> = new BehaviorSubject<UserData>({} as UserData);
  
  getLoggedUserData() : Observable<any>
  {
    return this.httpClient.get(`${environment.baseURL}users/profile-data`);
  }
  changePassword(data : any) : Observable<any>
  {
    return this.httpClient.patch(`${environment.baseURL}users/change-password`, data)
  }
  uploadProfilePhoto(photoForm : FormData) : Observable<any>
  {
    return this.httpClient.put(`${environment.baseURL}users/upload-photo`, photoForm)
  }
}
