import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/models/signUp';
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

  
  constructor(private signUpService:SignUpService, private router:Router) { }
  onInputFocus() {
    this.isButtonDisabled = false;
  }
  ngOnInit() {

  }
  login(){

  }
  updateFormValidity() {
    this.isFormValid = this.signupForm.valid && this.password === this.confirmPassword;
  }
  signUp() {
    console.log('User Name:', this.userName);
    console.log('Email:', this.email);
  
    if (this.password !== this.confirmPassword) {
      this.message = "Password and Confirm Password do not match";
    } else if(this.userName.length==0){this.message="Please Input UserName"}else {
      
      const formData = new FormData();
   
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('userName', this.userName);
      // var signUp = new SignUp(this.userName, this.email,this.password);
      this.signUpService.signUp(formData).subscribe((res)=>{
        if(res.code==200){
         this.router.navigate(['/']);
        }else{
          alert("somthing went wrong, please try again later")
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
