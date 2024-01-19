import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { ImportService } from 'src/app/services/import.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss'],
})
export class ImportModalComponent  implements OnInit {
  displayValue :string = 'none';
  UserDetails:any;
  dragedFile : any;
  constructor(private templateService:ImportService,
    private authService: AuthenticationService, private commanService: CommanLoaderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.UserDetails = this.authService.getUserDetails();

  }

  isDragOver: boolean = false;

  handleDrop(event: any) {
    event.preventDefault();
this.dragedFile = event.dataTransfer.files[0];
}

sendDragedFile(){
 // Check if event.dataTransfer and event.dataTransfer.files are defined
    if (this.dragedFile != null) {
        const formData = new FormData();
        formData.append("file", this.dragedFile);

        this.templateService.uploadtempalte(formData, this.UserDetails?.id).subscribe((res) => {
            if (res.code === 200) {
                this.close();
                this.commanService.presentToast("File uploaded successfully. ", 5000, "toast-succuss-mess");
            } else {
                this.commanService.presentToast("Invalid file format. Only .xlsx files are allowed.", 3000, "toast-error-mess");
            }
        });
    } else {
      this.commanService.presentToast("please drag a valid file here", 3000, "toast-error-mess");
    }
}

closeDailogbox(){
  this.close();
}
   
  

  handleDragOver(event: any) {
    event.preventDefault();
    this.isDragOver = true;
  }

  handleDragLeave(event: any) {
    this.isDragOver = false;
  }
  onFileSelected(event: any) {
 
    console.log(event.target.files[0])
    const formData = new FormData();
    formData.append("file",event.target.files[0])
    this.templateService.uploadtempalte(formData,this.UserDetails?.id).subscribe((res)=>{
      if(res.code === 200){
        this.close();
        this.commanService.presentToast("File uploaded successfully. ", 5000 , "toast-succuss-mess");
      }else{
        this.commanService.presentToast("Something went wrong !", 3000, "toast-error-mess");

      }
    })
  }
  downloadTemplate(){
    alert("we are working");
  // this.templateService.downloadTemplate().subscribe((res)=>{
  //   // const blob = new Blob([res]);
  //   const url = window.URL.createObjectURL(res);
  //           // Create a link and trigger download
  //           console.log(url);
  //           const link = document.createElement('a');
  //           link.href = url;
  //           link.download = 'Template.xlsx'; // Specify the file name
  //           document.body.appendChild(link);
  //           link.click();
    
  // })
  }
  close() {
    this.dialog.closeAll();
  }
}

