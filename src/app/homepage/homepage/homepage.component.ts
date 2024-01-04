import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/homepageServices/projects.service";
import { Project } from "./projects";
import { MatDialog } from "@angular/material/dialog";
import { AddClientModelComponent } from "../add-client-model/add-client-model.component";
import { AddClientService } from "src/app/services/homepageServices/add-client.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ImportModalComponent } from "../import-modal/import-modal.component";
import { CommanLoaderService } from "src/app/services/comman-loader.service";


@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  pageListNo = 15;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  // Pagination variables
  p: number = 1;
  searchText: any;
  pageFilterDefault: any = 15;
  clientId:any;
  projectList: Project[] = [];
  UserDetails:any;
  clientList: any[] = [];
  pageFilter = [
    { code: "15", name: "15" },
    { code: "30", name: "30" },
    { code: "45", name: "45" },
  ];
  constructor(
    private projectService: ProjectsService,
    public dialog: MatDialog,
    private clientService: AddClientService,
    private router: Router,
    private authService: AuthenticationService,
    private commanService: CommanLoaderService
  ) {
    
  }

  ngOnInit() {
     this.UserDetails = this.authService.getUserDetails();
    console.log(this.UserDetails);

    this.clientService.clientList$.subscribe((res) => {
      console.log(this.clientId,res);
      if (res.length > 0) {
        const clientId = res[0].id;
        this.clientId = clientId;
        
        this.getProjectList(clientId);
      } else {
        this.projectList = [];
      }
      this.clientList.length = 0;
      this.clientList.push(...res);
    });
    this.getClientByUserId(this.UserDetails?.id)


  }
  getClientByUserId(Userid:any){
    this.clientService.getClientByUserId(Userid).subscribe((clientRes) => {
      if (this.clientList.length === 0) {
        this.clientList.length = 0;
        this.clientList.push(...clientRes.data);
        if (this.clientList?.length > 0) {
          const clientId = this.clientList[0].id;
          this.clientId = clientId;
          this.getProjectList(clientId);
        } else {
          this.projectList = [];
        }
      }
    });
  }
  
  private getProjectList(clientId: string): void {
    this.projectService.getProjects(clientId).subscribe((projectsRes) => {
      if (projectsRes.data.length > 0) {
        this.projectList = projectsRes.data;
      } else {
        // No projects, clear projectList or perform any other necessary action
        this.projectList = [];
      }
    });
  }
  syncData(){
    this.projectService.syncData(this.UserDetails?.id,this.clientId).subscribe(res=>{
     
        this.getProjectList(this.clientId);
        this.getClientByUserId(this.UserDetails?.id)
        if(res.code==200){this.commanService.presentToast("Sync is completed", 5000 , "toast-succuss-mess");}
        else{this.commanService.presentToast(res.data, 5000 , "toast-error-mess");}
    })
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  optionSelected() {
    console.log(this.pageFilterDefault); // This will print the selected option's value
  }
  getProjectByselectedClient() {
    if (this.clientId !== undefined) {
      this.projectService.getProjects(this.clientId).subscribe((res) => {
        if(res.code==200){
        this.projectList = res.data;
        }else{
          this.projectList = [];
        }
      });
    }
  }
  public isDialogVisible: boolean = false;

  //modal
  openDialog(): void {
    let dialogRef = this.dialog.open(AddClientModelComponent, {
      width: "700px",
      height: "300px",
      // maxWidth: "100%",
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      console.log("The dialog was closed");
    });
  }

  getSprints(name: any, projectId: number) {
    this.router.navigate(["estimation-tool/homepage/sprintdashboard"], {
      queryParams: { projectId: projectId,clientId:this.clientId, projectName: name },
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
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
      console.log("The dialog was closed");
    });
  }
}
