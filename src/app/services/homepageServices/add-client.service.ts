import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  public saveClient( formData:FormData): Observable<any> {
    const fullApiUrl = this.apiUrl + "/saveclient";
    return this.http.post<any>(fullApiUrl, formData);

  }
  public getClient( ): Observable<any> {
    const fullApiUrl = this.apiUrl + "/getclients/2";
    return this.http.get<any>(fullApiUrl);

  }

  public updateClient( formData:FormData): Observable<any> {
    const fullApiUrl = this.apiUrl + "/updateclient";
    return this.http.put<any>(fullApiUrl, formData);
  }

  public deleteClient( id:any): Observable<any> {
    const fullApiUrl = this.apiUrl + "/deleteclient/"+id;
    return this.http.delete<any>(fullApiUrl);
  }
}
