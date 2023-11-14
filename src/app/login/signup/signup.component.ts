import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SignUp } from 'src/app/models/signUp';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { SignUpService } from 'src/app/services/sign-up.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  showSubmitButton: boolean = true;
  showPassword: boolean = false;
  //username : any;
  password1: any;
  input: any;
  userName: string= "";
  email: string= "";
  password: string="";
  confirmPassword: string= "";
  signupForm: any;
  isButtonDisabled:boolean=false;
  message: any;
  isFormValid: boolean=false;

  
  constructor(private signUpService:SignUpService, private router:Router, private commanService:CommanLoaderService, private toastCtrl : ToastController) { }
  onInputFocus() {
    this.isButtonDisabled = false;
  }
  ngOnInit() {

  }
 
  updateFormValidity() {
    this.isFormValid = this.signupForm.valid && this.password === this.confirmPassword;
  }
  signUp() {
    console.log('User Name:', this.userName);
    console.log('Email:', this.email);
  
    if (this.password !== this.confirmPassword) {
      this.message = "Password and Confirm Password did not match";
      this.commanService.presentToast("Password and Confirm Password did not match ", 3000, "toast-error-mess")
    } else if(this.userName.length==0){
      
      this.message="Please Input UserName"}else {
      
      const formData = new FormData();
   
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('userName', this.userName);
      // var signUp = new SignUp(this.userName, this.email,this.password);
      this.signUpService.signUp(formData).subscribe((res)=>{
        if(res.code==200){
         this.router.navigate(['/']);
         this.commanService.presentToast("Resignation successful! Continue with login ", 5000 , "toast-succuss-mess")
        }else{
          this.commanService.presentToast("email or username is already exist", 3000, "toast-error-mess")
        }
      });
    }
  }
 

  toggleShow(){
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password1';
  }
  // checkControlErrors(controlName: string, errorType: string): boolean {
  //   const control = this.signupForm.form.get(controlName);
  //   return control?.hasError(errorType) && (control.dirty || control.touched);
  // }


}
