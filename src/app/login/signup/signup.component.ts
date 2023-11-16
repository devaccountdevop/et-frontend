import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { CommanLoaderService } from "src/app/services/comman-loader.service";
import { SignUpService } from "src/app/services/sign-up.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  showSubmitButton: boolean = true;
  showPassword: boolean = false;
  //username : any;
  password1: any;
  input: any;
  userName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  signupForm: any;
  isButtonDisabled: boolean = false;
  message: any;
  isFormValid: boolean = false;

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private commanService: CommanLoaderService,
    private toastCtrl: ToastController
  ) {}
  onInputFocus() {
    this.isButtonDisabled = false;
  }
  ngOnInit() {}

  updateFormValidity() {
    this.isFormValid =
      this.signupForm.valid && this.password === this.confirmPassword;
  }
  signUp() {
    if (
      
      this.email.length === 0 ||
      this.password.length === 0 ||
      this.confirmPassword.length === 0
    ) {
      this.commanService.presentToast(
        "Please fill in all fields",
        3000,
        "toast-error-mess"
      );
    } else if (this.password !== this.confirmPassword) {
      this.message = "Password and Confirm Password did not match";
      this.commanService.presentToast(
        "Password and Confirm Password did not match",
        3000,
        "toast-error-mess"
      );
    } else if (this.userName.length == 0) {
      this.message = "Please input the username";
    }else {
      // Rest of the signUp method remains unchanged
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("userName", this.userName);
  
      this.signUpService.signUp(formData).subscribe((res) => {
        if(res.code==200){
          this.router.navigate(['/']);
          this.commanService.presentToast("Resignation successful! Continue with login ", 5000 , "toast-succuss-mess")
         }else{
           this.commanService.presentToast("email or username is already exist", 3000, "toast-error-mess")
         }
      });
    }
  }
  

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? "text" : "password1";
  }
}
