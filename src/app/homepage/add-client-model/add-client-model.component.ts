import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CommanLoaderService } from "src/app/services/comman-loader.service";
import { AddClientService } from "src/app/services/homepageServices/add-client.service";
import { ClientDeleteComponent } from "./client-delete/client-delete.component";
import { AlertController } from "@ionic/angular";
import { ClientUpdateComponent } from "./client-update/client-update.component";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-add-client-model",
  templateUrl: "./add-client-model.component.html",
  styleUrls: ["./add-client-model.component.scss"],
})
export class AddClientModelComponent implements OnInit {
  errormsg: boolean = false;
  clientName: string = "";
  jiraUserName: string = "";
  token: string = "";
  clientList: any[] = [];
  userId: any;
  constructor(
    private alertController: AlertController,
    private dialog: MatDialog,
    private addClientService: AddClientService,
    private authService: AuthenticationService,

  ) {}
  ngOnInit(): void {
const UserDetails = this.authService.getUserDetails();
this.userId = UserDetails?.id;
    this.addClientService.getClientByUserId(UserDetails?.id).subscribe((res) => {
      this.clientList = res.data;
    });
    this.clientName = "";
    this.jiraUserName = "";
    this.token = "";
  }

  clearInputs() {
    this.clientName = "";
    this.jiraUserName = "";
    this.token = "";
  }

  addClient() {
    if (
      this.clientName.length !== 0 &&
      this.jiraUserName.length !== 0 &&
      this.token.length !== 0
    ) {
      const formData = new FormData();
      formData.append("clientName", this.clientName);
      formData.append("userName", this.jiraUserName);
      formData.append("token", this.token);
      formData.append("userId", this.userId );
      this.addClientService.saveClient(formData).subscribe((res) => {
        this.clientList.push(res.data);
        this.clientName = "";
        this.jiraUserName = "";
        this.token = "";
        
        this.errormsg = false;
      });
    } else {
      this.errormsg = true;
    }
  }

  toggleEdit(item: any) {
    item.isEditing = !item.isEditing;
  }
  updateClient(item: any, id: any) {
    item.isEditing = false;
    const formData = new FormData();
    formData.append("clientName", item.clientName);
    formData.append("userName", item.jiraUserName);
    formData.append("token", item.token);
    formData.append("userId", item.userId);
    formData.append("id", id);
    this.addClientService.updateClient(formData).subscribe((res) => {});
  }

  deleteClient(id: any) {
    this.addClientService.deleteClient(id).subscribe((res) => {
      if (res.code == 200) {
        this.clientList = this.clientList.filter((item) => item.id !== id);
      } else {
        console.log("something went wrong");
      }
    });
  }

  closeDialog() {
    this.dialog.closeAll();
    this.clientName = "";
    this.jiraUserName = "";
    this.token = "";
  }

  confirmAndDeleteClient( id: number ): void {
  const dialogRef = this.dialog.open(ClientDeleteComponent,   {
    width: "280px",
  height: "150px",
  // maxHeight:'50000px',
  // maxWidth: "100%",
  // disableClose: true,
});  
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
         this.deleteClient(id);
      }
    });
  }

  confirmAndUpdateClient(item: any , id: any){
    const dialogRef = this.dialog.open(ClientUpdateComponent,   {
      width: "280px",
    height: "150px",
    // maxHeight:'50000px',
    // maxWidth: "100%",
    // disableClose: true,
  });  
      dialogRef.afterClosed().subscribe(result => {
        if ( result ) {
           this.updateClient(item, id);
        }
        item.isEditing = false;
      });
    }

  }

