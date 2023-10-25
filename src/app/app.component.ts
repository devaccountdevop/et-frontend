import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public authService:AuthenticationService, private route:Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((res)=>{
      if(res)
      {
        this.route.navigate(['/estimation-tool/homepage']);
      }else{
        this.route.navigate(['/']);
      }
    });
  
    
  }

 
  
  
}
