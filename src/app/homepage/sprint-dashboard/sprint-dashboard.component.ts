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
  pageListNo = 15;
  clientId: any;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  id: any = 45;
  // Pagination variables
  p: number = 1;
  searchText: any;
  sprintsList: Project[] = [];

  // clientList: any[] = [];
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
      this.clientId = params['clientId']
   });
   if(this.projectId !== 0){
   this.getSprints(this.projectId)
   }
  }

  getSprints(projectId:any){
    this.sprintService.getSprints(projectId).subscribe((res)=>{
      if(res.code === 200){  
        this.sprintsList = res.data;
      }else{
        this.sprintsList =[];
      }
    });
  }

  syncData(){
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  loadItems() {
    // Simulated data loading
    this.sprintsList = [];
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  optionSelected() {
    console.log(this.pageFilterDefault); // This will print the selected option's value
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
      queryParams: { sprintId:item.sprintId,  sprintName:item.summary, projectId: this.projectId,clientId:this.clientId,projectName: this.projectName},
    });
    
  }
   checkNumber(number: number): string {
    if (number % 2 === 0) {
        return "green"; // Even number
    } else if (number % 3 === 0) {
        return "blue"; // Divisible by 3
    } else {
        return "red"; // Odd number
    }
    
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
   //}
 
   openGraphPopup(event: MouseEvent, item: any) {
     this.sprintService.setSharedItem(item);
     const offsetX = 470; 
     const offsetY = 250; 
     
     const clientX = event.clientX;
     const clientY = event.clientY;
     const viewportHeight = window.innerHeight;
     
     let positionTop = clientY;
     if (clientY + offsetY > viewportHeight) {
       
       positionTop = viewportHeight - offsetY;
     }
   
     let dialogRef = this.dialog.open(TaskGraphComponent, {
       width: "450px",
       height: "225px",
       data: { item },
       hasBackdrop: false,
       position: { left: (clientX - offsetX) + 'px', top: positionTop + 'px' },
     });
     dialogRef.afterClosed().subscribe((result) => { 
      
     });
   }
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
   //this.popover.dismiss();
   this.dialog.closeAll();
 
 }


}
