import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, retry, catchError, tap } from 'rxjs/operators';
import { AddUser, EditUser, User} from '../../models/users';
import { AppConstants } from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  Users: User[];
  newUser: AddUser = {
    firstName: '',
    lastName: '',
    employeeId: ''
  };

  constructor(private  httpClient: HttpClient) { }
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

   // get all users
   getAllUsers() {
    return this.httpClient.get(AppConstants.baseURL + '/users');
  }

  getUser(id: string) {
    return this.httpClient.get(AppConstants.baseURL + '/users/' + id);
  }

  searchUsers(searchUserRequest: string) {
    return this.httpClient.get(AppConstants.baseURL + '/users/search', {params: new HttpParams().set('q', searchUserRequest)});
  }


  addUser(user: AddUser): Observable<any> {
    return this.httpClient.post<any>(AppConstants.baseURL + '/users', user, this.httpOptions);
  }

  updateUser(user: any): Observable<any> {
    return this.httpClient.patch<any>(AppConstants.baseURL + '/users/' + user.userId , user, this.httpOptions);
  }

  deleteUser(id: any): Observable<any> {
    return this.httpClient.delete<any>(AppConstants.baseURL + '/users/' + id, this.httpOptions);
  }
}
