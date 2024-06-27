import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelDownloadService {


  apiUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  downloadProject(data:FormData): Observable<Blob> {

    const fullApiUrl = this.apiUrl + "/download";
    return this.http.post(fullApiUrl,data, { responseType: 'blob' } );
  }
}
