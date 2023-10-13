import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignUp } from '../models/signUp';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public signUp( formData:FormData): Observable<any> {
    const fullApiUrl = this.apiUrl + "/signup";
    return this.http.post<any>(fullApiUrl, formData);

  }
}
