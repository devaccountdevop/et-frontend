import { CanMatchFn } from "@angular/router";

export const protectGuard:CanMatchFn = (route,segments)=>{
  const UserDetails = localStorage.getItem('userDetails');
  if(!!UserDetails){
    return true;
  }else{
    return false;
  }
}
