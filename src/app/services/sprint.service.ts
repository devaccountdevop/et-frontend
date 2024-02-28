import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SprintService {
  apiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  public sharedItemSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  sharedItem$: Observable<any> = this.sharedItemSubject.asObservable();

  setSharedItem(item: any) {
    this.sharedItemSubject.next(item);
  }

  public getSprints(id: any): Observable<any> {
    const fullApiUrl = this.apiUrl + "/getAllSprints/" + id;
    return this.http.get<any>(fullApiUrl);
  }
}
