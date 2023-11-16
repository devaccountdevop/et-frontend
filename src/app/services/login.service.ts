import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  public login(form:FormData): Observable<any> {
    const fullApiUrl = this.apiUrl + "/login";
    //console.log(form.get('email'));
   // console.log(form.get('password'));
    return this.http.post<any>(fullApiUrl, form);

  }

  public apicheck(): Observable<any> {
    const fullApiUrl = this.apiUrl + "/welcome";
    //console.log(form.get('email'));
   // console.log(form.get('password'));
    return this.http.get<any>(fullApiUrl);

  }
}
