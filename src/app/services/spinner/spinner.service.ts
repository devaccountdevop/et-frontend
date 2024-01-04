import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerVisibilitySubject = new BehaviorSubject<boolean>(false);
  spinnerVisibility$ = this.spinnerVisibilitySubject.asObservable();

  showSpinner() {
    this.spinnerVisibilitySubject.next(true);
  }

  hideSpinner() {
    this.spinnerVisibilitySubject.next(false);
  }
}
