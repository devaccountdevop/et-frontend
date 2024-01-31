import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { LoginService } from 'src/app/services/login.service';
import { LocalStorage } from 'src/app/modals/localStorage';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  submitted: boolean = false;
  resetForm!: FormGroup;
  userValueForm!: FormGroup;
  confirmPassword: boolean = false;
  confirmPasswordUserValue: boolean = false;
  userValue!: string;
  resetPassword: boolean = false;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private loginService: LoginService, private commonService: CommanLoaderService, private router: Router) { }

  ngOnInit() {
    this.removeQueryParam();


    this.createForm();
    this.CreateUserValueForm();
    this.resetForm.get('confirmPassword')?.valueChanges.subscribe((value: any) => {
      this.matchPassword(value);
    })
    this.userValueForm.get('confirmPassword')?.valueChanges.subscribe((value: any) => {
      this.matchPassword(value);
    })
  }
  matchPassword(value: string) {
    if (!this.userValue) {
      if (this.resetForm.value.newPassword === value) {
        this.confirmPassword = false;
      } else {
        this.confirmPassword = true;
      }
    } else {
      if (this.userValueForm.value.newPassword === value) {
        this.confirmPasswordUserValue = false;
      } else {
        this.confirmPasswordUserValue = true;
      }
    }
  }
  removeQueryParam() {
    console.log(localStorage.getItem(LocalStorage.userValue));

    const userValue = localStorage.getItem(LocalStorage.userValue);
    this.userValue = JSON.parse(userValue!)
    if (localStorage.getItem(LocalStorage.userValue)) {
      const userValue = localStorage.getItem(LocalStorage.userValue);
      this.userValue = JSON.parse(userValue!)
    } else {
      if (!localStorage.getItem(LocalStorage.forgotPassword)) {
        this.route.params.subscribe(res => {
          this.resetPassword = true;
          if (res['userName']) localStorage.setItem(LocalStorage.forgotPassword, JSON.stringify(res['userName']))
          this.router.navigate(['/resetPassword'])
        })
      } else {
        const userValue = localStorage.getItem(LocalStorage.forgotPassword);
        this.userValue = JSON.parse(userValue!)
        this.resetPassword = true;
        console.log(this.userValue);
      }

    }
  }

  createForm() {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }
  CreateUserValueForm() {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/;
  
    this.userValueForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, ]],
      newPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  

  forgotPassword() {
    this.submitted = true;
    if (this.resetForm.invalid) return;
    const formData = new FormData();
    formData.append("userName", this.userValue);
    formData.append("newPassword", this.resetForm.value.newPassword);

    this.loginService.forgotPassWithoutUservalue(formData).subscribe(res => {
      if (res.code === 200) {
        this.submitted = false;
        this.resetForm.reset();
        localStorage.removeItem(LocalStorage.userValue);
        localStorage.removeItem(LocalStorage.forgotPassword);
        this.commonService.presentToast("Password reset Successfully", 5000, "toast-succuss-mess");
        this.router.navigate(['/'])
      } else {
        this.commonService.presentToast("Username or password is incorrect", 3000, "toast-error-mess");
      }
    })

  }
  resetPasswordUserValue() {
    this.submitted = true;
    if (this.userValueForm.invalid) return;

    const formData = new FormData();
    formData.append("userName", this.userValue);
    formData.append("oldPassword", this.userValueForm.value.oldPassword);
    formData.append("newPassword", this.userValueForm.value.newPassword);

    this.loginService.resetPassword(formData).subscribe(res => {
      if (res.code === 200) {
        this.submitted = false;
        this.userValueForm.reset();
        localStorage.removeItem(LocalStorage.userValue);
        this.commonService.presentToast("Password reset Successfully", 5000, "toast-succuss-mess");
        this.router.navigate(['/'])
      } else {
        this.commonService.presentToast("old password is incorrect", 3000, "toast-error-mess");
      }
    })
  }
}
