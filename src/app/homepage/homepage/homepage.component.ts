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
import { Observable } from "rxjs";
import { MenuService } from "src/app/services/menu.service";
import { ProjectGraphComponent } from "./project-graph/project-graph.component";

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
  selectedOption: any;
  showDiv: boolean = false;
  // Pagination variables
  p: number = 1;
  searchText: any;
  pageFilterDefault: any = 15;
  clientId: any;
  projectList: Project[] = [];
  checkprojectList:any []=[];
  UserDetails: any;
  clientList: any[] = [];
  pageFilter = [
    { code: "15", name: "15" },
    { code: "30", name: "30" },
    { code: "45", name: "45" },
  ];
  updatedProject: any[] = [];
  constructor(
    private projectService: ProjectsService,
    public dialog: MatDialog,
    private clientService: AddClientService,
    private router: Router,
    private authService: AuthenticationService,
    private commonService: CommanLoaderService,
  ) {}

  ngOnInit() {
    this.UserDetails = this.authService.getUserDetails();

    this.clientService.clientList$.subscribe((res) => {
      if (res.length > 0) {
        const clientId = res[0].id;
        this.clientId = clientId;

        this.getProjectList(clientId);
      } else if(this.clientId ==="0000"){}
      else {
        
       this.projectList =[];
        setTimeout(() => {
          this.showDiv = true;
      }, 1000); // Delay for 2 seconds (2000 milliseconds)
      this.clientId = undefined;
      }
      this.clientList.length = 0;
      this.clientList.push(...res);
    });
    this.getClientByUserId(this.UserDetails?.id);
    this.clientService.clientList$.subscribe((res)=>{
      this.clientList.length = 0;
      this.clientList.push(...res); 
    })
   
    
   
    
  }
  getClientByUserId(Userid: any) {
    this.clientService.getClientByUserId(Userid).subscribe((clientRes) => {
      if (this.clientList.length === 0) {
        this.clientList.length = 0;
        this.clientList.push(...clientRes.data);
        if (this.clientList?.length > 0) {
          const clientId = this.clientList[0].id;
          this.clientId = clientId;
          const client = this.clientList.find(client => {
            return client.id == this.clientId;
        });
          this.getProjectList(clientId);
        } else {
          this.projectList = [];
          setTimeout(() => {
            this.showDiv = true;
        }, 1000); // Delay for 2 seconds (2000 milliseconds)
    
        }
      }
    });
    console.log(this.clientId);
  }

  private getProjectList(clientId: string): void {
    this.projectList=[];
    this.projectService.getProjects(clientId).subscribe((projectsRes) => {

      if (projectsRes.data.length > 0) {
        this.projectList = projectsRes.data;
      } else {
        this.projectList = [];
        setTimeout(() => {
          this.showDiv = true;
      }, 1000); // Delay for 2 seconds (2000 milliseconds)
  
      }
    });
    console.log(this.clientId);
  }
  syncData() {
    if(this.clientId ==="0000"){
       this.commonService.presentToast(
       "Sync only works with Jira client" ,
        3000,
        "toast-error-mess"
      );
    }else if(this.clientId === undefined){
      this.commonService.presentToast(
        "please select a client" ,
         3000,
         "toast-error-mess"
       );
    }  else{
    this.projectService
      .syncData(this.UserDetails?.id, this.clientId)
      .subscribe((res) => {
        if (res.code == 200) {
          this.getProjectList(this.clientId);
          this.getClientByUserId(this.UserDetails?.id);
          if (res.data !== null &&  res.data.length>0) {
            this.updatedProject = res.data;
            let projectIds = this.updatedProject
              .map((project) => project.projectId)
              .join(", ");
            let projectname = this.updatedProject
              .map((project) => project.projectName)
              .join(", ");

            let message = "";
            if (this.updatedProject.length === 1) {
              message =
                "Project " + "'" + projectname + "'" + " name has been changed";
            } else {
              message = "Projects " + projectIds + " have been changed";
            }

            this.commonService.presentToast(
              message,
              5000,
              "toast-succuss-mess"
            );
          } else {
            this.commonService.presentToast(
              "Syncing is completed",
              3000,
              "toast-succuss-mess"
            );
          }
        } else if (res.code == 401) {
          this.commonService.presentToast(
            res.message,
            3000,
            "toast-error-mess"
          );
        }
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  getProjectByselectedClient() {
    if (this.clientId !== undefined) {   
      if(this.clientId ==="0000"){
        const importedData = {id: "0000", clientName: 'Imported Data', jiraUserName: '', token: "", userId: this.UserDetails?.id};
        
        this.projectService.getImportedProjects(this.UserDetails?.id).subscribe((res)=>{
        if(res.code ==200){
          this.projectList = res.data;
        
        }else{
          this.projectList=[];
         
        }
        });
      
        }else{
          const client = this.clientList.find(client => {
            return client.id == this.clientId;
        });
  
              this.projectService.getProjects(this.clientId).subscribe((res) => {
                if (res.code == 200) {
                  this.projectList = res.data;
         
                } else {
                  this.projectList = [];
                  setTimeout(() => {
                    this.showDiv = true;
                }, 1000); // Delay for 2 seconds (2000 milliseconds)
            
                }
              });
            }
      
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
      this.clientService.clientList$.subscribe((res)=>{
        if(this.clientId !=="0000"){
          this.projectList=[];
        }
if(res.length==0){
this.clientId = undefined
this.projectList = [];
}
      })
      const client = this.clientList.find(client => {
        return client.id == this.clientId;
    });

    });
  }

  getSprints(item:any) {
    this.router.navigate(["estimation-tool/sprintdashboard"], {
      queryParams: {
        projectId: item.projectId,
        clientId: this.clientId,
        projectName: item.projectName,
        projectStartDate: item.projectStartDate,
        projectEndDate: item.projectEndDate
      },
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
     
      this.getClientByUserId(this.UserDetails?.id);
    });
  }

  openGraphPopup(event: MouseEvent, item: any) {
     this.projectService.setSharedItem(item);
  
    const offsetX = 470;
    const offsetY = 400;
  
    const clientX = event.clientX;
    const clientY = event.clientY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    let positionLeft = clientX - offsetX;
    let positionTop = clientY;
  
    // Adjust position if dialog goes off the screen on the right
    if (positionLeft + 500 > viewportWidth) {
      positionLeft = viewportWidth - 500;
    }
  
    // Adjust position if dialog goes off the screen on the bottom
    if (positionTop + offsetY > viewportHeight) {
      positionTop = viewportHeight - offsetY;
    }
  
    // Adjust position if dialog goes off the screen on the left
    if (positionLeft < 0) {
      positionLeft = 0;
    }
  if(item.sprintInfoDtos.length ==0){
    this.commonService.presentToast("Graph data not available for " + item.projectName+ " project.", 3000, "toast-error-mess");
  }else{
    let dialogRef = this.dialog.open(ProjectGraphComponent, {
      width: "460px",
      height: "400px",
      data: { item },
      hasBackdrop: true,
      position: { left: positionLeft + 'px', top: positionTop + 'px' },
    });
    dialogRef.afterClosed().subscribe((result) => {
     
      this.p = 0;

    });
  }
    
  
   
  }
  iconList = ["check_circle", "error", "warning"];

  getIconColor(originalEstimate: number, aiEstimate: number): string {
    const differencePercentage = (originalEstimate - aiEstimate) / aiEstimate * 100;
    
    if (differencePercentage > 10) {
      return 'error';
    } else if (differencePercentage >= 0 && differencePercentage <= 10) {
      return 'warning';
    } else {
      return 'success';
    }
  }
}
