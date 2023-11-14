import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  private sharedItemSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  sharedItem$: Observable<any> = this.sharedItemSubject.asObservable();

  setSharedItem(item: any) {
    this.sharedItemSubject.next(item);
  }

  updateItem(item:any){
     this.sharedItemSubject.next(item);
  }
  public getTaskBySprintId(sprintId: any, projectId:any): Observable<any> {

    const fullApiUrl = this.apiUrl + "/getAllTasks/"+sprintId +"/"+projectId;
    return this.http.get<any>(fullApiUrl );

  }

  updateEstimatesInJira(updateTasks: any):Observable<any> {
    console.log('Update Tasks:', updateTasks);
    const fullApiUrl = this.apiUrl + "/saveestimates";
    return this.http.post<any>(fullApiUrl, updateTasks );

  }
  
}
