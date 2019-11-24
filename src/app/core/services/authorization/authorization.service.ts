import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { endpoints } from './endpoints';
import { environment } from '../../../../environments/environment';
import { UserDataResponse } from '../../../shared/models/authorization.model';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private isAuth: boolean;
  constructor(private http: HttpClient) { }

  logIn(userInfo) {
    return this.http.post(`${endpoints.auth}signInWithPassword?key=${environment.firebase.apiKey}`,
      {email: userInfo.login, password: userInfo.pass, returnSecureToken: true });
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isAuth = false;
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getUserInfo() {
    const userToken = localStorage.getItem('token');
    this.http.post(
      `${endpoints.auth}lookup?key=${environment.firebase.apiKey}`,
      {idToken: userToken}
    ).subscribe((res: UserDataResponse) => res);
  }

  setUserToken(token) {
    localStorage.setItem('token', token);
  }

  removeUserToken() {
    localStorage.removeItem('token');
  }
}