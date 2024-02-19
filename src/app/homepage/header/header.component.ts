import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  pageListNo = 15;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  selectedOption: any;
  // Pagination variables
  userName:String | undefined;
 
  constructor(
  
  
    private router: Router,
    private authService: AuthenticationService,
    
  ) { }

  public sidebarShow: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
     this.userName = this.authService.getUserDetails()?.userName;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
