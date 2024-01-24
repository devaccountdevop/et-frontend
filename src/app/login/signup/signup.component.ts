import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  showPassword: boolean = false;
  confirmPassword: boolean = false;
  signUpForm!:FormGroup;
  submitted:boolean = false;

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private commanService: CommanLoaderService,
    private toastCtrl: ToastController,
    private formBuilder:FormBuilder
  ) {}

  createForm() {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/;
  
    this.signUpForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(passwordPattern) 
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(passwordPattern) 
        ]
      ]
    });
  }
  

  ngOnInit() {
    this.createForm();
    this.signUpForm.get('confirmPassword')?.valueChanges.subscribe((value:any) => {
      this.matchPassword(value);
      console.log('Value changed:', value);})
  }
  matchPassword(value:any){
   if(this.signUpForm.value.password === value){
    this.confirmPassword = false;
   }else{
    this.confirmPassword = true;
   }
  }

  signUp() { 
   this.submitted = true;
   if(this.signUpForm.invalid) return;
   if(this.confirmPassword)return;
      
      const formData = new FormData();
      formData.append("userName", this.signUpForm.value.userName);
      formData.append("email", this.signUpForm.value.email);
      formData.append("password", this.signUpForm.value.password);
  
      this.signUpService.signUp(formData).subscribe((res) => {
        if(res.code==200){
          this.router.navigate(['/']);
          this.commanService.presentToast("Registration successful! Continue with login ", 5000 , "toast-succuss-mess");
         }else{
           this.commanService.presentToast("email or username is already exist", 3000, "toast-error-mess");
         }
      });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

}
