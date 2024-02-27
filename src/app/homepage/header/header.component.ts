import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  isDropdownOpen = false;
  selectedOption: any;
  userName:String | undefined;

@Output() toggleSidebar = new EventEmitter<void>();
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private menuService: MenuService,
    private route: Router
    
  ) { }

  public sidebarShow: boolean = false;

  onToggleSidebar() {
    this.menuService.toggle();
  }

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
  landingPage(){
    this.route.navigate(['/estimation-tool']);
  }
}
