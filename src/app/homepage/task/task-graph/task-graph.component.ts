import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { SprintService } from "src/app/services/sprint.service";
import { TaskService } from "src/app/services/task.service";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { IonAccordion } from "@ionic/angular";
@Component({
  selector: "app-task-graph",
  templateUrl: "./task-graph.component.html",
  //templateUrl: './graph-idea.html',
  styleUrls: ["./task-graph.component.scss"],
  //styleUrls: ['./graph-idea.scss'],
})
export class TaskGraphComponent implements OnInit {
  mouseInsideDialog: boolean = false;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  item: any;

  noOfDays: any[] = [];
  labels: string[] = [];
  barChartData: ChartData<"bar" | "line"> = {
    labels: [],
    datasets: [],
  };
  AiEstimateForChart: any[] = [];
  velocityForChart: any[] = [];
  actualForChart: number[] = [];
  remainingforTable: number[] = [];
  threePointForChart: any[] = [];
  riskFactorForTable: any[] = [];
  totalSumOfAiEstimate = 0;
  totalActualEstimate = 0;
  totalRemaining = 0;
  averageVelocity = 0;
  totalThreePointEstimate = 0;
  totalRiskFactors = 0;
  constructor(
    private dialog: MatDialog,
    private sprintService: SprintService
  ) {}
  ngOnInit(): void {
    this.sprintService.sharedItem$.subscribe((item: any) => {
      this.labels = [];
      this.noOfDays = [];
      this.AiEstimateForChart = [];
      this.AiEstimateForChart = [];
      this.velocityForChart = [];
      this.actualForChart = [];
      this.remainingforTable = [];
      this.threePointForChart = [];
      this.riskFactorForTable = [];
      this.totalSumOfAiEstimate = 0;
      this.totalActualEstimate = 0;
      this.totalRemaining = 0;
      this.averageVelocity = 0;
      this.totalThreePointEstimate = 0;
      this.totalRiskFactors = 0;
      if (item.graphData) {
        const keys = Object.keys(item.graphData);
        keys.sort();

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          this.noOfDays.push(key);

          const dataForDate = item.graphData[key];
          if (dataForDate && dataForDate.length > 0) {
            this.AiEstimateForChart.push(dataForDate[0].aiEstimate);
            this.velocityForChart.push(dataForDate[0].velocity);
            this.threePointForChart.push(dataForDate[0].threePointEstimate);
            this.riskFactorForTable.push(dataForDate[0].riskFactor);
            this.actualForChart.push(dataForDate[0].actualEstimate );
            this.remainingforTable.push(dataForDate[0].remaining / 8);
          } else {
            this.AiEstimateForChart.push(0);
          }
    const dateParts = key.split('-');
    const dateObject = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
    const formattedDate = dateObject.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    this.labels.push(formattedDate);
        }

        this.AiEstimateForChart.forEach((val) => {
          let numericVal = parseFloat(val);
          if (!isNaN(numericVal)) {
            this.totalSumOfAiEstimate += numericVal;
          }
        });
        this.totalSumOfAiEstimate = +this.totalSumOfAiEstimate.toFixed(2);
        this.velocityForChart.forEach((val) => {
          let numericVal = parseFloat(val);
          if (!isNaN(numericVal)) {
            this.averageVelocity += numericVal;
          }
        });
        this.threePointForChart.forEach((val) => {
          let numericVal = parseFloat(val);
          if (!isNaN(numericVal)) {
            this.totalThreePointEstimate += numericVal;
          }
        });
        this.riskFactorForTable.forEach((val) => {
          let numericVal = parseFloat(val);
          if (!isNaN(numericVal)) {
            this.totalRiskFactors += numericVal;
          }
        });

        this.averageVelocity /= this.noOfDays.length;
        this.averageVelocity = +this.averageVelocity.toFixed(2);
        console.log(this.noOfDays.length);

        this.actualForChart.forEach((val) => {
          this.totalActualEstimate += val;
        });

        this.remainingforTable.forEach((val) => {
          this.totalRemaining += val;
        });

        this.updateChart();
      } else {
        this.labels = [];
        this.AiEstimateForChart = [];
        console.log("Item does not have graphData");
      }
    });
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

  // public barChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       position: 'bottom', // Show x-axis labels at the bottom
  //       stacked: true,
  //       grid: {
  //         display: false, // Set to false to hide grid lines for x-axis
  //       },
  //       ticks: {
  //         display: false,

  //       },
  //     },

  //     y: {
  //       stacked: false,
  //       display: true,
  //       position: 'left', // Position the y-axis on the left side
  //       title: {
  //         display: true,
  //         text: 'Estimation', // Add the title 'Estimation' to the y-axis
  //         font: {
  //           size: 12,
  //           weight: 'bold'
  //         }
  //       }
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'bottom',
  //       align: "center",
  //       labels:{
  //         // boxWidth:30,
  //        font:{
  //         size:12
  //        }
  //       }

  //     },
  //     tooltip: {

  //     }
  //   }

  // }

  public barChartType: ChartType = "bar";
  public barChartPlugins = [pluginDataLabels];

  updateChart() {
    this.barChartData = {
      labels: this.labels,
      datasets: [
        {
          label: "Ai Estimated",
          data: this.AiEstimateForChart,
          type: "line",
          backgroundColor: "rgb(118, 169, 81)",
          borderColor: "rgb(118, 169, 81)",
          pointBackgroundColor: "rgb(118, 169, 81)",
          pointBorderColor: "rgb(118, 169, 81)",
          pointHoverBorderColor: "rgb(118, 169, 81)",
          pointHoverBackgroundColor: "rgb(118, 169, 81)",
          // borderJoinStyle: "round",
          pointStyle: false,
        },
        {
          data: this.threePointForChart,
          label: "3-Point",
          backgroundColor: "rgb(89, 156, 216)",
          borderColor: "rgb(89, 156, 216)",
          pointBackgroundColor: "rgb(89, 156, 216)",
          pointBorderColor: "rgb(89, 156, 216)",
          pointStyle: false,
          type: "line",
          hidden: false,
        },
        {
          label: "Velocity",
          data: this.velocityForChart,
          type: "line",
          backgroundColor: "rgb(45, 65, 117)",
          borderColor: "rgb(45, 65, 117)",
          pointBackgroundColor: "rgb(45, 65, 117)",
          pointBorderColor: "rgb(45, 65, 117)",
          pointStyle: false,
          hidden: false,
        },

        {
          label: "Actual",
          hidden: false,
          type: "bar",
          data: this.actualForChart,
          backgroundColor: "rgb(251, 194, 0)",
          borderColor: "rgb(251, 194, 0)",
         pointStyle:"circle",
         
         
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
