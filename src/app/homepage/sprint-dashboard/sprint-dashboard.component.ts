import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/homepageServices/projects.service';
import { SprintService } from 'src/app/services/sprint.service';
import { Project } from '../homepage/projects';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { TaskGraphComponent } from '../task/task-graph/task-graph.component';

@Component({
  selector: 'app-sprint-dashboard',
  templateUrl: './sprint-dashboard.component.html',
  styleUrls: ['./sprint-dashboard.component.scss'],
})
export class SprintDashboardComponent  implements OnInit {
  projectName:any;
  projectId:any;
  projectStartDate:any;
  projectEndDate: any;
  pageListNo = 15;
  clientId: any;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  id: any = 45;
  p: number = 1;
  searchText: any;
  sprintsList: any[] = [];

  pageFilter = [
    { code: "15", name: "15" },
    { code: "30", name: "30" },
    { code: "45", name: "45" },
  ];
  pageFilterDefault: any = 15;

  constructor(
    private commanService: CommanLoaderService,
    private projectService: ProjectsService,
    public dialog: MatDialog,
    private sprintService: SprintService,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationService

    
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectName = params['projectName'];
      this.clientId = params['clientId'],
      this.projectStartDate = params['projectStartDate'],
      this.projectEndDate = params['projectEndDate']
   });
   if(this.projectId !== 0){
   this.getSprints(this.projectId)
   }
  }

  getSprints(projectId:any){
    this.sprintService.getSprints(projectId).subscribe((res)=>{
      if(res.code === 200){  
        this.sprintsList = res.data;
        this.sprintsList.push({sprintId:-1,projectId:'',sprintName:"Backlog"})

        console.log(this.sprintsList);
        
       
      }else{
        this.sprintsList =[];
      }
    });
  }

  syncData(){

    if(this.clientId ==="0000"){
      this.commanService.presentToast(
      "Sync only works with Jira client" ,
       3000,
       "toast-error-mess"
     );
   }else{
    let UserDetails = this.authService.getUserDetails();
    this.projectService.syncData(UserDetails?.id,this.clientId).subscribe((res)=>{
     if(this.projectId){
       this.getSprints(this.projectId)
     }else{
       this.router.queryParams.subscribe(params => {
         this.projectId = params['projectId'];
         this.projectName= params['projectName'];
      });
      if(this.projectId !== 0)this.getSprints(this.projectId)
     }
     if(res.code==200){this.commanService.presentToast("Sync is completed", 5000 , "toast-succuss-mess");}
     else{this.commanService.presentToast(res.data, 5000 , "toast-error-mess");}
    })
   }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  loadItems() {
    this.sprintsList = [];
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  optionSelected() {
    console.log(this.pageFilterDefault); 
  }
  logout() {
    this.authService.logout();
    this.route.navigate(["/"]);
  }
  
  landingPage(){
    this.route.navigate(['/estimation-tool']);
  }
  getTask(item:any){
    this.route.navigate(["estimation-tool/tasklist"], {
      queryParams: { sprintId:item.sprintId,  sprintName:item.sprintName, projectId: this.projectId,clientId:this.clientId,projectName: this.projectName, startDate:item.startDate, endDate:item.endDate, projectStartDate:this.projectStartDate, projectEndDate:this.projectEndDate},
    });
     this.dialog.closeAll();
  }
 
iconList = ['check_circle', 'error', 'warning'];

getIcon(index: number): string {
  return this.iconList[index % this.iconList.length];
}

// async openGraphPopup( item: any) {
//   this.taskService.setSharedItem(item);
//   const modal = await this.popover.create({
//     component: TaskBarGraphComponent,
//     event: event,
//    showBackdrop:false,
//   });
//   await modal.present();
//   await modal.onDidDismiss();
//   console.log("The modal was dismissed");
//    }
 
   openGraphPopup(event: MouseEvent, item: any) {
    this.sprintService.setSharedItem(item);
  
    const offsetX = 470;
    const offsetY = 360;
  
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
  
    let dialogRef = this.dialog.open(TaskGraphComponent, {
      width: "400px",
      height: "310px",
      data: { item },
      hasBackdrop: true,
      position: { left: positionLeft + 'px', top: positionTop + 'px' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // Handle dialog close if needed
    });
  }
  

  // openGraphPopup(event: MouseEvent, item: any) {
  //   this.sprintService.setSharedItem(item);
  
  //   const offsetX = 480;
  //   const offsetY = 360;
  
  //   const clientX = event.clientX;
  //   const clientY = event.clientY;
  //   const viewportWidth = window.innerWidth;
  //   const viewportHeight = window.innerHeight;
  
  //   let positionLeft = clientX - offsetX;
  //   let positionTop = clientY;
  
  //   // Adjust position if dialog goes off the screen on the right
  //   if (positionLeft + 500 > viewportWidth) {
  //     positionLeft = viewportWidth - 500;
  //   }
  
  //   // Adjust position if dialog goes off the screen on the bottom
  //   if (positionTop + offsetY > viewportHeight) {
  //     positionTop = viewportHeight - offsetY;
  //   }
  
  //   // Adjust position if dialog goes off the screen on the left
  //   if (positionLeft < 0) {
  //     positionLeft = 0;
  //   }
  
  //   let dialogRef = this.dialog.open(TaskGraphComponent, {
  //     width: "470px",
  //     height: "310px",
  //     data: { item },
  //     hasBackdrop: true,
  //     position: { left: positionLeft + 'px', top: positionTop + 'px' },
  //   });
  
  //   dialogRef.afterClosed().subscribe((result) => {
  //     // Handle dialog close if needed
  //   });
  // }
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
   
 closePopup(){
   this.dialog.closeAll();
 }
}
