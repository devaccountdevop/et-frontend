import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getProjects(): Observable<any> {
    const fullApiUrl = this.apiUrl + "/getAllProjects";

    return this.http.get<any>(fullApiUrl );
  }
}
