import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getProjects(id: any): Observable<any> {

    const headers = new HttpHeaders({
      'userId': "2"
      
    });
    const fullApiUrl = this.apiUrl + "/getAllProjects";

    return this.http.get<any>(fullApiUrl, { headers: headers });
  }
}
