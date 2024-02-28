import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  apiUrl: string = environment.apiUrl;

   clientListSubject = new BehaviorSubject<any[]>([]);
  public clientList$: Observable<any[]> = this.clientListSubject.asObservable();

  constructor(private http: HttpClient) { }

 
  

  setClientList(item: any) {
    this.clientListSubject.next(item);
  
  }
  public saveClient( formData:FormData): Observable<any> {
    const fullApiUrl = this.apiUrl + "/saveclient";
    return this.http.post<any>(fullApiUrl, formData);

  }
  public getClientByUserId(userId:any ): Observable<any> {
    const fullApiUrl = this.apiUrl + "/getclients/"+ userId;
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
  updateClientList(newClientList: any[]): void {
    this.clientListSubject.next(newClientList);
  }

  
}
