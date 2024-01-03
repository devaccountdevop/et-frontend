import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImportService {
  apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  downloadTemplate():Observable<any>{
  return this.http.get<any>(this.apiUrl+ "/downloadtemplate")
  }
  uploadtempalte(File:any,userId:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+ `/uploadFile/${userId}`,File)
  }
}
