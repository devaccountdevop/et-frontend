import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    public authService: AuthenticationService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((res) => {
      if (Object.keys(res).length) {
        this.authService.isLoggedIn$.subscribe((response) => {
          if (response) {
            if (Object.keys(res).length === 0)this.route.navigate(["/estimation-tool/homepage"]);
          } else {
            this.route.navigate(["/"]);
          }
        });
      }
    }); 
  }
}
