import { Injectable } from '@angular/core';
import { SignUp } from '../models/signUp';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // TOKEN_KEY: string = "userName";
  // TOKEN_VALUE: string = "password";
  // isLogin:boolean = false;
  
  
  // constructor() { 
  // }

  // public saveData(key: string, value: string) {
  //   localStorage.setItem(this.TOKEN_KEY, key);
  //   localStorage.setItem(this.TOKEN_VALUE, value);
  //   this.isLogin = true;
  // }

  

  // public getData(key: string) {
  //   return localStorage.getItem(key);
  // }

  // public removeData(key: string) {
  //   localStorage.removeItem(key);
  //   this.isLogin = false;
  // }

  // public clearData() {
  //   localStorage.clear();
  //   this.isLogin = false;
  // }

  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
  }

  login() {
    // logic
    localStorage.setItem('loggedIn', 'true');
    this.isLoggedIn$.next(true);
  }

  logout() {
    // logic
    localStorage.setItem('loggedIn', 'false');
    this.isLoggedIn$.next(false);
  }
}
