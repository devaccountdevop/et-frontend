import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class SprintService {
  apiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient, private authService:AuthenticationService) {}
  public sharedItemSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  sharedItem$: Observable<any> = this.sharedItemSubject.asObservable();

  setSharedItem(item: any) {
    this.sharedItemSubject.next(item);
  }

  public getSprints(id: any): Observable<any> {
    const UserDetails = this.authService.getUserDetails();
    const fullApiUrl = this.apiUrl + "/getAllSprints/" + id+ "/"+UserDetails!.id;;
    return this.http.get<any>(fullApiUrl);
  }
}
