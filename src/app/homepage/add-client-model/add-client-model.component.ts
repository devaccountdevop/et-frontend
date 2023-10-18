import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClientService } from 'src/app/services/homepageServices/add-client.service';

@Component({
  selector: 'app-add-client-model',
  templateUrl: './add-client-model.component.html',
  styleUrls: ['./add-client-model.component.scss'],
})
export class AddClientModelComponent  implements OnInit {

 
  clientName: string = '';
  jiraUserName: string = '';
  token: string = '';
 clientList:any[] =[
 ];
  constructor( private dialog : MatDialog, private addClientService :AddClientService) { }
  ngOnInit(): void {


     this.addClientService.getClient().subscribe((res)=>{
      this.clientList = res.data;
     });
    this.clientName = '';
    this.jiraUserName = '';
    this.token = '';

   
  }

  clearInputs() {
    this.clientName = '';
    this.jiraUserName = '';
    this.token = '';
  }

  addClient() {
if(this.clientName.length!==0 && this.jiraUserName.length!==0 && this.token.length!==0){
  const formData = new FormData();
      formData.append('clientName', this.clientName);
      formData.append('userName', this.jiraUserName);
      formData.append('token', this.token);
      formData.append('userId', "2");
  this.addClientService.saveClient(formData).subscribe((res)=>{
        this.clientList.push(res.data);
        this.clientName = '';
    this.jiraUserName = '';
    this.token = '';
  });
}
    
  }


  toggleEdit(item:any) {
    item.isEditing = !item.isEditing;
  }
  updateClient(item : any, id:any){
    item.isEditing = false;
    console.log(id);

  }
  closeDialog(){
   this.dialog.closeAll();
   this.clientName = '';
    this.jiraUserName = '';
    this.token = '';

  }

}
