import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable,finalize } from "rxjs";
import { SpinnerService } from "../services/spinner/spinner.service";
import { Injectable } from "@angular/core";
@Injectable()

export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerService:SpinnerService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.showSpinner();
        return next.handle(req).pipe(
          finalize(()=> this.spinnerService.hideSpinner())
        );
    }

}