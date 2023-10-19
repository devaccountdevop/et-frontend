import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.scss'],
})
export class DashboadComponent  implements OnInit {

 //dataList: Array<any> = [];
 schedule: { branch: ''; } | undefined;
 pageListNo = 15;


 // Pagination variables
 p: number = 1;



 loadItems() {
   // Simulated data loading
   this.names = [
   
   ];
 }
 dataList = [
   { code: '1', name: 'M10' },
   { code: '2', name: ' Clavrit HRMS' },
   { code: '3', name: 'RspotBot' }
 ];
 pageFilter=[
 {code: '15', name: '15'},
 {code: '30', name: '30'},
 {code: '45', name: '45'},

]
pageFilterDefault: any= 15;


 selectedValue: string = 'Select'; 
 constructor(private modalController: ModalController ) {
 
  }
 menuType: string = 'reveal';
 isModalOpen : boolean = false;
 isDropdownOpen = false;
 names: string[] = ['Project1', 'Project2', 'project3', 'project4', 'project5','Project6', 'Project7', 'project8', 'project9', 'project10','Project11', 'Project12', 'project13', 'project14', 'project15','Project16', 'Project17', 'project18', 'project19', 'project20','Project21', 'Project22', 'project23', 'project24', 'project25'];
 toggleDropdown() {
   this.isDropdownOpen = !this.isDropdownOpen;
 }
 ngOnInit() {}
 setOpen(isOpen: boolean) {
   this.isModalOpen = isOpen;
   
 }
 optionSelected() {
  
   console.log(this.pageFilterDefault); // This will print the selected option's value
 }

}
