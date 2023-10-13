import { Injectable } from '@angular/core';
import { SignUp } from '../models/signUp';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  TOKEN_KEY: string = "email";
  TOKEN_VALUE: string = "password";
  USER_ROLE:string = "role";
  USER:string = "empMaster";
  isLogin:boolean = false;
  
  
  constructor() { 
    this.isLogin = this.getData(this.TOKEN_KEY)? true : false;
    
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(this.TOKEN_KEY, key);
    localStorage.setItem(this.TOKEN_VALUE, value);
    this.isLogin = true;
  }

  public saveEmpMaster(user:SignUp) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  public getData(key: string) {
    var data =  localStorage.getItem(key);
    if(data == undefined){
      data = "";
    }
    return data;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
    this.isLogin = false;
  }

  public clearData() {
    localStorage.clear();
    this.isLogin = false;
  }

  public getEmpMaster(){
    var empMasterString = localStorage.getItem(this.USER);
    if(empMasterString != null){
     this.USER = JSON.parse(empMasterString);
    }
    
    return this.USER;
  }

  public getRole(){
    return this.USER;
  }
}
