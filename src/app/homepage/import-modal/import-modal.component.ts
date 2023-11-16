import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss'],
})
export class ImportModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  isDragOver: boolean = false;

  handleDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false;
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
      console.log('Cell A1 Value:', cellValue);
    };

    reader.readAsBinaryString(file);
  }

  // Add other functions as needed
}

