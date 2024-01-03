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
  constructor(private templateService:ImportService,
    private authService: AuthenticationService, private commanService: CommanLoaderService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.UserDetails = this.authService.getUserDetails();

  }

  isDragOver: boolean = false;

  handleDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false;
    console.log(event);
    
    const file = event.dataTransfer.files[0];
    this.readExcel(file);
  }

  handleDragOver(event: any) {
    event.preventDefault();
    this.isDragOver = true;
  }

  handleDragLeave(event: any) {
    this.isDragOver = false;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.isDragOver = false;
    this.readExcel(file);
  }
  readExcel(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

      // Access the data in the workbook and process it as needed
      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

      // Example: Log the data from the first cell
      const cellValue: any = worksheet['B4'].v;
      console.log('Cell B4 Value:', cellValue);
    };

    reader.readAsBinaryString(file);
  }

  // Add other functions as needed
  onFileSelected(event: any) {
    alert()
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
  this.templateService.downloadTemplate().subscribe((res)=>{
    // const blob = new Blob([res]);
    const url = window.URL.createObjectURL(res);
            // Create a link and trigger download
            console.log(url);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Template.xlsx'; // Specify the file name
            document.body.appendChild(link);
            link.click();
    
  })
  }
  close() {
    this.dialog.closeAll();
  }
}

