import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthenticationService,private route:ActivatedRoute) { }

  public getProjects(id: any): Observable<any> {
    
    const fullApiUrl = this.apiUrl + "/getAllProjects/"+id;

    return this.http.get<any>(fullApiUrl);
  }

  syncData(userId:any,clientId:any){
    return this.http.get<any>(this.apiUrl+'/sync'+`/${userId}`+`/${clientId}`);
  }

}
