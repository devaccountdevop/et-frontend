import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { ImportService } from 'src/app/services/import.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss'],
})
export class ImportModalComponent implements OnInit {
  displayValue: string = 'none';
  UserDetails: any;
  dragedFile: any;
  updatedProject: any[] = [];
  constructor(private templateService: ImportService,
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

  sendDragedFile() {
    if (this.dragedFile != null) {
      const formData = new FormData();
      formData.append("file", this.dragedFile);

      this.templateService.uploadtempalte(formData, this.UserDetails?.id).subscribe((res) => {
        if (res.code === 200) {
          if (res.data !== null && res.data.length > 0) {
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
            this.close();
            this.commanService.presentToast(
              message,
              5000,
              "toast-succuss-mess"
            );

          } else {
            this.close();
            this.commanService.presentToast("File uploaded successfully. ", 5000, "toast-succuss-mess");
          }

        } else {
          this.close();
          this.commanService.presentToast(res.message, 3000, "toast-error-mess");
        }
      },
      (error) => {
        // Handle the error case
        this.close();
        this.commanService.presentToast("Something went wrong, please try again later", 3000, "toast-error-mess");
      }
    );
    } else {
      this.close();
      this.commanService.presentToast("please drag a valid file here", 3000, "toast-error-mess");
    }
  }

  closeDailogbox() {
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
    if (event.target.files[0] != null) {
      console.log(event.target.files[0])
      const formData = new FormData();
      formData.append("file", event.target.files[0])
      this.templateService.uploadtempalte(formData, this.UserDetails?.id).subscribe((res) => {
        if (res.code === 200) {

          if (res.data !== null && res.data.length > 0) {
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
            this.close();
            this.commanService.presentToast(
              message,
              5000,
              "toast-succuss-mess"
            );

          } else {
            this.close();
            this.commanService.presentToast("File uploaded successfully. ", 5000, "toast-succuss-mess");
          }

        } else {
          this.close();
          this.commanService.presentToast(res.message, 3000, "toast-error-mess");
        }
      },
        (error) => {
          // Handle the error case
          this.close();
          this.commanService.presentToast("Something went wrong, please try again later", 3000, "toast-error-mess");
        }
      )


    } else {
      this.close();
      this.commanService.presentToast("Please select a file to upload", 3000, "toast-error-mess");
    }

  }
  downloadTemplate() {
    this.templateService.downloadTemplate().subscribe((res) => {
      const data = [
        res.data[0],
        ...res.data.slice(1),
      ];
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'template.xlsx');
    });
  }
  close() {
    this.dialog.closeAll();
  }
}