import { Component, OnInit } from '@angular/core';
import { ImportModalComponent } from '../import-modal/import-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AddClientService } from 'src/app/services/homepageServices/add-client.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  implements OnInit {
  UserDetails: any;
  isOpen: boolean = false;
  sidebarWidth: string = '250px'; // Default width
  constructor( public dialog: MatDialog, private sidebarService: MenuService, private authService: AuthenticationService, private clientService: AddClientService ) { }
  menuType: string = 'overlay';
  ngOnInit(): void {
    this.UserDetails = this.authService.getUserDetails();

    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }
  toggleSidebar() {
    this.sidebarService.toggle();
  }
  openImportDialog(): void {
    let dialogRef = this.dialog.open(ImportModalComponent, {
      width: "600px",
      height: "280px",
      // maxWidth: "100%",
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.clientService.getClientByUserId(this.UserDetails?.id).subscribe((res)=>{
this.clientService.setClientList(res.data);
      })
     
    });
  }


}
