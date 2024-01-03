import { Injectable } from '@angular/core';
import { SignUp } from '../modals/signUp';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from '../modals/userDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
  }


  logout() {
    localStorage.removeItem('userDetails');
    localStorage.setItem('loggedIn', 'false');
    this.isLoggedIn$.next(false);
  }

  saveUserDetails(user: UserDetails) {
    localStorage.setItem('loggedIn', 'true');
    this.isLoggedIn$.next(true);
    // Assuming you want to save user details in localStorage
    localStorage.setItem('userDetails', JSON.stringify(user));
  }

  getUserDetails(): UserDetails | null {
    // Assuming you stored user details as a JSON string in localStorage
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      return JSON.parse(userDetailsString);
    }
    return null;
  }
}
