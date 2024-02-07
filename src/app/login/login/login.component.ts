import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {  Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { CommanLoaderService } from "src/app/services/comman-loader.service";
import { LoginService } from "src/app/services/login.service";
import { TaskService } from "src/app/services/task.service";
import { ForgotPopupComponent } from "../forgot-popup/forgot-popup.component";
import { LocalStorage } from "src/app/modals/localStorage";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  errormsg: boolean = false;
  submitted:boolean = false;
  loginForm!:FormGroup;
  showEyeIcon = false;
  constructor(
    private loginService: LoginService,
    private dialog:MatDialog,
    private router: Router,
    private authService: AuthenticationService,
  private commonService: CommanLoaderService,
    private formBuilder:FormBuilder,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/;
    
    this.loginForm = this.formBuilder.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required,
        Validators.pattern(passwordPattern) ]]// Adjust the regex as needed
    })
  }

  login() {
    this.submitted = true;
    if(this.loginForm.invalid) return;
   console.log(this.loginForm.value.userName,this.loginForm.value.password);
    const formData = new FormData();
    formData.append("email", this.loginForm.value.userName);
    formData.append("password", this.loginForm.value.password);

    this.loginService.login(formData).subscribe((res) => {
      if (res.code === 200) {
        this.authService.saveUserDetails(res.data);
        this.router.navigate(["/estimation-tool/homepage"]);
        this.loginForm.reset();
        this.submitted = false;
      } else {
        this.submitted = false;
        this.commonService.presentToast("Username or password is incorrect", 3000, "toast-error-mess");
      }
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

forgotPassword(){
  let dialogRef = this.dialog.open(ForgotPopupComponent, {
    width: "500px",
    height: "350px",
    // data: { item },
  });
}

resetPassword(){
  if(!this.loginForm.value.userName.trim()){
    this.commonService.presentToast("Username is Requried.", 3000, "toast-error-mess");
    return;
  }
  this.loginService.checkUserInDB(this.loginForm.value.userName).subscribe((res)=>{
if(res.code == 200){
  localStorage.setItem(LocalStorage.userValue,JSON.stringify(this.loginForm.value.userName))
  this.router.navigate(['/resetPassword'])
}else{
  this.commonService.presentToast("user does not exist.", 3000, "toast-error-mess");
}
  })
  
}



toggleShowEye() {
  this.showEyeIcon = !this.showEyeIcon;
}
}
