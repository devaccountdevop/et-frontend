import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  showPassword: boolean = false;
  userName : string="";
  password: string="";
  input: any;
  constructor(private loginService:LoginService, private route:Router) { }

  ngOnInit() {}
  login(){
    const formData = new FormData();
  console.log(this.userName);
  console.log(this.password);
  formData.append('email', this.userName);
  formData.append('password', this.password);
this.loginService.login(formData).subscribe((res)=>{
if(res.code===200){
  this.route.navigate(['/homepage']);
  this.userName ="";
  this.password ="";
}else{
  alert("somthing went wrong, please try again later");
}
});
  this.userName ="";
  this.password ="";


  }

  toggleShow(){
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }

}
