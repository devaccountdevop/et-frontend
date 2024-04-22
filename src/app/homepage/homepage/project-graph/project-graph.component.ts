import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { BaseChartDirective } from 'ng2-charts';
import { ProjectsService } from 'src/app/services/homepageServices/projects.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-project-graph',
  templateUrl: './project-graph.component.html',
  styleUrls: ['./project-graph.component.scss'],
})
export class ProjectGraphComponent  implements OnInit {

  mouseInsideDialog: boolean = false;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  item: any;
sprintDaysinWeeks:any;
  noOfDays: any[] = [];
  labels: any[] = [];
  barChartData: ChartData<"bar" | "line"> = {
    labels: [],
    datasets: [],
  };
  sprintDates: any[] = [];
   sprintDataForBar: any[] = [];
  // actualForChart: number[] = [];
  // remainingforTable: number[] = [];
  // threePointForChart: any[] = [];
  // riskFactorForTable: any[] = [];
  // totalSumOfAiEstimate = 0;
  // totalActualEstimate = 0;
  // totalRemaining = 0;
  // averageVelocity = 0;
  // totalThreePointEstimate = 0;
  // totalRiskFactors = 0;
  constructor(
    private dialog: MatDialog,
    private sprintService: ProjectsService
  ) {}
  ngOnInit(): void {
    this.sprintService.sharedItem$.subscribe((item: any) => {
     if(item.sprintInfoDtos.length == 0){
      this.sprintDates = [];
     }else{
      this.sprintDates = [];
        item.sprintInfoDtos.forEach((sprintInfoDto: any) => {
            Object.keys(sprintInfoDto.graphData).forEach((key: string) => {
                this.sprintDates.push(key);
            });
        });
         this.sprintDaysinWeeks = this.sprintDates.length/7;

       
         
     }
    });

    if (this.sprintDaysinWeeks < 20) {
      const newArrayLength = this.sprintDaysinWeeks;
      this.sprintDataForBar = Array.from({ length: newArrayLength }, () => 5);
      this.labels = Array.from({ length: newArrayLength }, (_, index) => index + 1);
  }
    this.updateChart();
  }

  public barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    scales: {
      x: {
        position: "bottom",
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
          font:{
            size:8
          }
        },
      },

      y: {
        stacked: false,
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Estimation",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",

        labels: {
          boxWidth: 28,
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
  };

  public barChartType: ChartType = "bar";
  public barChartPlugins = [pluginDataLabels];

  updateChart() {
    this.barChartData = {
       labels: this.labels,
      //labels:["sprint 1","sprint 2","sprint 3", "sprint 4","sprint 5","sprint 6", "sprint 7"],
      datasets: [
        // {
        //   label: "Ai Estimated",
        //   // data: this.AiEstimateForChart,
        //   data: [5, 10, 15, 20, 25,30,35],
        //   type: "line",
        //   backgroundColor: "rgb(118, 169, 81)",
        //   borderColor: "rgb(118, 169, 81)",
        //   pointBackgroundColor: "rgb(118, 169, 81)",
        //   pointBorderColor: "rgb(118, 169, 81)",
        //   pointHoverBorderColor: "rgb(118, 169, 81)",
        //   pointHoverBackgroundColor: "rgb(118, 169, 81)",
        //   // borderJoinStyle: "round",
        //   pointStyle: false,
        // },
        // {
        //   // data: this.threePointForChart,
        //   data: [2, 4, 6, 8, 10,12,14],
        //   label: "3-Point",
        //   backgroundColor: "rgb(89, 156, 216)",
        //   borderColor: "rgb(89, 156, 216)",
        //   pointBackgroundColor: "rgb(89, 156, 216)",
        //   pointBorderColor: "rgb(89, 156, 216)",
        //   pointStyle: false,
        //   type: "line",
        //   hidden: false,
        // },
        // {
        //   label: "Velocity",
        //   // data: this.velocityForChart,
        //   data: [5, 7, 9, 11, 13,15,17],
        //   type: "line",
        //   backgroundColor: "rgb(45, 65, 117)",
        //   borderColor: "rgb(45, 65, 117)",
        //   pointBackgroundColor: "rgb(45, 65, 117)",
        //   pointBorderColor: "rgb(45, 65, 117)",
        //   pointStyle: false,
        //   hidden: false,
        // },

        {
          label: "weeks",
          hidden: false,
          type: "bar",
           data: this.labels, 
          //data: [15, 25, 35, 45, 55,65,75],
          backgroundColor: "rgb(251, 194, 0)",
          borderColor: "rgb(251, 194, 0)",
         pointStyle:"circle",
         maxBarThickness:30,
          hoverBackgroundColor: "orange",
        },
      ],
    };
  }
  //  barChartData: ChartData<'bar' | 'line'> = {
  //   labels: this.labels,
  //   datasets: [
  //     {
  //       label: 'Ai Estimated',
  //       data: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80,80,80,80],
  //       type: 'line',
  //       backgroundColor: 'rgb(118, 169, 81)',
  //       borderColor: 'rgb(118, 169, 81)',
  //       pointBackgroundColor: 'rgb(118, 169, 81)',
  //       pointBorderColor: 'rgb(118, 169, 81)',
  //       pointHoverBorderColor: 'rgb(118, 169, 81)',
  //       pointHoverBackgroundColor: 'rgb(118, 169, 81)',
  //       borderJoinStyle: 'round',
  //       pointStyle: false,
  //     },
  //     {
  //       data: [1, 3, 2, 4, 2, 1, 9, 1, 2, 4, 1,4,2,1],
  //       label: '3-Point',
  //       backgroundColor: 'rgb(89, 156, 216)',
  //       borderColor: 'rgb(89, 156, 216)',
  //       pointBackgroundColor: 'rgb(89, 156, 216)',
  //       pointBorderColor: 'rgb(89, 156, 216)',
  //       pointStyle: false,
  //       type: 'line',
  //       hidden: false,

  //     },
  //     {
  //       label: 'Velocity',
  //       data: [2, 3, 4, 5, 4, 3, 5, 9, 7, 8, 10,12,11,13],
  //       type: 'line',
  //       backgroundColor: 'rgb(45, 65, 117)',
  //       borderColor: 'rgb(45, 65, 117)',
  //       pointBackgroundColor: 'rgb(45, 65, 117)',
  //       pointBorderColor: 'rgb(45, 65, 117)',
  //       pointStyle: false,
  //       hidden: false
  //     },

  //     {
  //       label: 'Actual',
  //       hidden: false,
  //       type: 'bar',
  //       data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,65,70,75,80],
  //       backgroundColor: 'rgb(251, 194, 0)',
  //       borderColor: 'rgb(251, 194, 0)',

  //       hoverBackgroundColor: 'orange',

  //     },
  //   ]
  // };

  onMouseEnterDialog() {
    this.mouseInsideDialog = true;
  }
  onMouseLeaveDialog() {
    if (this.mouseInsideDialog) {
      this.dialog.closeAll();
    }
  }
}
