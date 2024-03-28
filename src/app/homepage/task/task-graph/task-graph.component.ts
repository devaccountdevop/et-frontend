import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskService } from 'src/app/services/task.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-task-graph',
  templateUrl: './task-graph.component.html',
  styleUrls: ['./task-graph.component.scss'],
})
export class TaskGraphComponent implements OnInit {
//   taskData: any = {}; // Change the type to object
//   barChartData: any[] = [];
//   barChartLabels: any[] = [];
//   sprintId:any;
// sprintData:any =[];
//   constructor(private taskService: TaskService,
//     private sprintService: SprintService,
//     public dialogRef: MatDialogRef<TaskGraphComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//     ) { }

//     ngOnInit() {
    
//       this.sprintService.sharedItem$.subscribe((res)=>{
// this.sprintId = res.sprintId;
// this.taskData = res;
// console.log(this.sprintId);
// // this.taskService.getTaskBySprintId(this.sprintId, 4).subscribe((res)=>{
// //   this.sprintData = Object.values(res.data);
//       // })
//   this.updateChart();
       
//   //       console.log(this.sprintData);
//   //       console.log(this.sprintData.length);
        
//   //       const tasksWithStoryPoints = this.sprintData.filter((task:any) => task.storyPoints !== null);
//   // const  sumOfStoryPoints = tasksWithStoryPoints.reduce((prev:number, curr:any) => prev + curr.storyPoints,0 );
//   //       if (tasksWithStoryPoints.length === 0) {
//   //         alert('No tasks with story points in this sprint');
//   //          console.log(sumOfStoryPoints);
//   //       }
//       })
     
   
      
//     }
    
    
    
    


//   updateChart() {
//     // Update chart data and labels based on taskData
//     this.barChartData = [
//       { data: [this.taskData.sumOfAiEstimate], label: 'AI estimate', backgroundColor: 'yellow' },
//       { data: [this.taskData.sumOfOriginalEstimate], label: 'Original estimate', backgroundColor: 'black' },
//     ];

//     this.barChartLabels = ["Sprint id:"+this.taskData.sprintId];
//   }

//   public barChartOptions = {
//     scaleShowVerticalLines: false,
//     responsive: true,
//     scales: {
//       x: {
//         ticks: {
//           color: 'black' 
//         }
//       },
//       y: {
//         ticks: {
//           color: 'black' 
//         }
//       }
//     },
//     barPercentage: .85,
//     categoryPercentage: .30
//   };
//   public barChartType = 'bar';
//   public barChartLegend = true;

@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  item: any;

ngOnInit(): void {
    
}

public barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  scales: {
    x: {
      position: 'bottom', // Show x-axis labels at the bottom
      stacked: true,
      grid: {
        display: false, // Set to false to hide grid lines for x-axis
      },
      ticks: {
        display: false,
      
      },
    },
    
    y: {
      stacked: false,
      display: true,
      position: 'left', // Position the y-axis on the left side
      title: {
        display: true,
        text: 'Estimation', // Add the title 'Estimation' to the y-axis
        font: {
          size: 12,
          weight: 'bold'
        }
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: "start",
      labels:{
        boxWidth:25,
       font:{
        size:10
       }
      }
      
      
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          return label;
        }
      }
    }
  }
  
}

public barChartType: ChartType = 'bar';
public barChartPlugins = [pluginDataLabels];

public barChartData: ChartData<'bar' | 'line'> = {
  labels: [
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
    'D10',
    'D11',
    'D12',
    'D13',
    'D14',
  ],
  datasets: [
    {
      label: 'Ai Estimated',
      data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,80,80,80],
      type: 'line',
      backgroundColor: 'rgb(118, 169, 81)',
      borderColor: 'rgb(118, 169, 81)',
      pointBackgroundColor: 'rgb(118, 169, 81)',
      pointBorderColor: 'rgb(118, 169, 81)',
      pointHoverBorderColor: 'rgb(118, 169, 81)',
      pointHoverBackgroundColor: 'rgb(118, 169, 81)',
    },
    {
      label: 'Velocity',
      data: [2, 3, 4, 5, 4, 3, 5, 9, 7, 8, 10,12,11,13],
      type: 'line',
      backgroundColor: 'rgb(45, 65, 117)',
      borderColor: 'rgb(45, 65, 117)',
      pointBackgroundColor: 'rgb(45, 65, 117)',
      pointBorderColor: 'rgb(45, 65, 117)',
      hidden: false
    },
    { 
      data: [1, 3, 2, 4, 2, 1, 9, 1, 2, 4, 1,4,2,1],
      label: 'Remaining',
      backgroundColor: 'rgb(89, 156, 216)', // First color for the bars
      hoverBackgroundColor: '#013220', // Hover color for the bars
      type: 'bar',
      hidden: false,
     
     
    },
    {
      label: 'Actual',
      hidden: false,
      type: 'bar',
      data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,65,70,75,80],
      backgroundColor: 'rgb(251, 194, 0)',
      borderColor: 'rgb(251, 194, 0)',
     
      hoverBackgroundColor: 'orange',
     
     
    },
  ]
};
}
