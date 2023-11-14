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
  errormsg: boolean = false;
  isButtonDisabled: boolean  = false;
  isFormValid: any;
  signupForm: any;
  message : string ="";

  
  constructor(
    private loginService: LoginService,
    private route: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    
  }
  login() {
    if (
      this.userName.length !== 0 &&
      this.password.length !== 0
    ) {

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
       this.errormsg = true;
       this.message = "please input correct userName or password";
        // this.userName = "";
        // this.password = "";
      }
    });
  }else{
    this.errormsg = true;
    this.message = "username and password is required";
  }
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? "text" : "password";
  }

  onInputFocus() {
    this.isButtonDisabled = false;
  }

  resetErrorMessage(){
    this.message = "";
  }
}
