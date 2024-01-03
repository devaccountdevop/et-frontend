import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public authService:AuthenticationService, private router:Router,private route:ActivatedRoute,private activeRoute:ActivatedRoute) {}

  ngOnInit() {

  //   this.activeRoute.queryParams.subscribe((res) => {
  //     console.log(res);
      
  //        if (Object.keys(res).length) {
  //          this.authService.isLoggedIn$.subscribe((response) => {
  //           console.log(response);
            
  //            if (response) {
  //              if (Object.keys(res).length === 0)this.router.navigate(["/estimation-tool/homepage"]);
  //            } else {
  //              this.router.navigate(["/"]);
  //            }
  //          });
  //        }else{
  //         this.authService.isLoggedIn$.subscribe(response=>{
  //           console.log(response,Object.keys(res).length );
  //           if (response) {
  //             if (Object.keys(res).length === 0)this.router.navigate(["/estimation-tool/homepage"]);
  //           } else {
  //             this.router.navigate(["/"]);
  //           }
  //         })
  //        }
  //      });
  
    
  }

 
  
  
}
