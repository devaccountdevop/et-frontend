import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  userName: string = "";
  password: string = "";
  input: any;
  constructor(
    private loginService: LoginService,
    private route: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}
  login() {
    const formData = new FormData();
    formData.append("email", this.userName);
    formData.append("password", this.password);
    this.loginService.login(formData).subscribe((res) => {
      if (res.code === 200) {
        this.route.navigate(["/estimation-tool/homepage"]);
        this.authService.login();
        this.userName = "";
        this.password = "";
      } else {
        alert("somthing went wrong, please try again later");
      }
    });
    this.userName = "";
    this.password = "";
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? "text" : "password";
  }
}
