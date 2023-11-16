import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { CommanLoaderService } from "src/app/services/comman-loader.service";
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
    private authService: AuthenticationService,
    private commonService: CommanLoaderService
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
        this.authService.saveUserDetails(res.data);
        this.userName = "";
        this.password = "";
      } else {
       this.errormsg = true;
       this.message = "Username or password is incorrect";
      }
    });
    
  }else if(this.userName.length ==0){
    this.errormsg = true;
    this.message = "Please input the username ";
  }else{
    this.errormsg = true;
    this.message = "Please input the password ";
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

  apicheck(){
    this.loginService.apicheck().subscribe((res)=>{
if (res.code==200){
 this.commonService.presentAlert("alrt", res.data);
}
    })
  }
}
