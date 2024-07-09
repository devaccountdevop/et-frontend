import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  ChartConfiguration,
  ChartData,
  ChartDataset,
  ChartType,
} from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { BaseChartDirective } from "ng2-charts";
import { ProjectsService } from "src/app/services/homepageServices/projects.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-project-graph",
  templateUrl: "./project-graph.component.html",
  styleUrls: ["./project-graph.component.scss"],
})
export class ProjectGraphComponent implements OnInit {
  mouseInsideDialog: boolean = false;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  item: any;
  p: number = 1;
  pageFilterDefault: any = 10;
  sprintDaysinWeeks: any;
  noOfDays: number[] = [];
  labels: any[] = [];
  barChartData: ChartDataset[] = [
  ]
  sprintDates: any[] = [];
  sprintDataForBar: any[] = [];
  aisumofaiestimate: any[] = [];
  sumoforiginal: any[] = [];
  sumofworklogs: any[] = [];
  originalEstimateData: any[] = [];
  workLogEstimateData: any[] = [];
  completedTask: any[] = [];
  notStartedTask: any[] = [];
  totalPlanned: any[] = [];
  overEstimate: any[] = [];
  sumOfVelocity: any[] = [];
  threePointEstimate: any[] = [];
  backlogTask: any[] = [];
  totalScope: any[] = [];
  totalThreePointEstimateOfBacklog = 0;
  addtotalScope: any[] = [];
  newScope: any[] = [];
  scopeForSprint: any[] = [];

  constructor(
    private dialog: MatDialog,
    private sprintService: ProjectsService,
    private taskService: TaskService
  ) { }
  ngOnInit(): void {
    this.labels = [];
    this.sprintDataForBar = [];
    this.sprintDates = [];
    this.aisumofaiestimate = [];
    this.sumoforiginal = [];
    this.sumofworklogs = [];
    this.originalEstimateData = [];
    this.workLogEstimateData = [];
    this.completedTask = [];
    this.notStartedTask = [];
    this.totalPlanned = [];
    this.overEstimate = [];
    this.threePointEstimate = [];
    this.totalScope = [];
    this.sumOfVelocity = [];
    this.backlogTask = [];
    this.noOfDays = [];
    this.newScope=[];

    this.sprintService.sharedItem$.subscribe((item: any) => {
      if (item.sprintInfoDtos.length == 0) {
        this.sprintDates = [];
      } else {
        item.sprintInfoDtos.forEach((sprintInfoDto: any, index: number) => {
          const sumOfOriginalEstimate = sprintInfoDto.taskDetails.reduce((sum: number, task: any) => {
            return sum + parseFloat(task.originalEstimate);
          }, 0);

          let sumOfNotstartedEstimate = 0;
          let sumOfVelocityEstimate = 0;
          let sumOfOverEstimate = 0;
      
          sprintInfoDto.taskDetails.forEach((task: any) => {
            
              
              const threePointEstimate = parseFloat(task.threePointEstimate);
              const actual = parseFloat(task.actual);
             
              const difference = threePointEstimate - actual;
  
              if (difference === threePointEstimate) {
                  // "not started"
                  sumOfNotstartedEstimate += threePointEstimate;
              } else if (difference >= 0) {
                  // "started"
                  // Calculate velocity
                  const velocity = Math.min(actual, threePointEstimate);
                  const formattedVelocity = parseFloat(velocity.toFixed(2));
                  sumOfVelocityEstimate += formattedVelocity;
              } else {
                  // "over estimate"
                  sumOfOverEstimate += threePointEstimate;
              }
          });
      
          // Push accumulated sums to respective arrays
          this.sumOfVelocity.push(sumOfVelocityEstimate);
          this.notStartedTask.push(sumOfNotstartedEstimate);
          this.overEstimate.push(sumOfOverEstimate);
          this.totalPlanned.push(sumOfOriginalEstimate );
          this.completedTask.push();
          this.notStartedTask.push();
          this.newScope.push(sprintInfoDto.projectScope )
          const sprintNumber = sprintInfoDto.sprintName.split(' ').pop();
          this.labels.push(`S-${sprintNumber}`);
          const startDate = new Date(sprintInfoDto.startDate);
          const endDate = new Date(sprintInfoDto.endDate);
          const sprintDurationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
          this.noOfDays.push(sprintDurationInDays);
        });
        let totalSumofOriginal = 0;
        this.addtotalScope = this.totalPlanned;
        totalSumofOriginal = this.addtotalScope.reduce((accumulator, currentValue) => {
          // Convert currentValue to a number if it's not already
          let numberValue = Number(currentValue);
          if (isNaN(numberValue)) {
            throw new Error("All elements in the array must be numbers");
          }
          return accumulator + numberValue;
        }, 0);
        this.totalPlanned = this.cumulativeSum(this.totalPlanned);
        this.completedTask = this.cumulativeSum(this.sumOfVelocity);
        this.backlogTaskfetch();
        console.log(this.totalScope);
        const totalSumofOriginalEstimate = this.totalThreePointEstimateOfBacklog ;
        this.totalScope = this.labels.map(() => totalSumofOriginal + totalSumofOriginalEstimate);
        this.scopeForSprint = this.totalScope.map((value, index) => {
          if (value === this.newScope[index]) {
            return value.toFixed(2); 
          } else {
            return (value - this.newScope[index]).toFixed(2);
           } 
        });
        
      
        this.scopeForSprint.pop();
        this.scopeForSprint.push((totalSumofOriginal + totalSumofOriginalEstimate).toFixed(2));
        
      
        console.log(this.scopeForSprint);
      }
    });

  }

  cumulativeSum(arr: number[]): number[] {
    let cumulativeArray: number[] = [];
    let sum: number = 0;

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      cumulativeArray.push(sum);
    }

    return cumulativeArray;
  }
  backlogTaskfetch() {
     this.sprintService.backlogTask.subscribe((res) => {
      this.backlogTask = [];
      const backlogTask = res;
      this.totalThreePointEstimateOfBacklog;
      if (backlogTask != null) {
        const sumOfThreePointEstimatess = backlogTask.reduce((sum: number, task: any) => {
          if (task.originalEstimate == null) {
            return sum;
          }
          return sum + parseFloat(task.originalEstimate);
        }, 0);
        this.totalThreePointEstimateOfBacklog = sumOfThreePointEstimatess;
      }

      this.backlogTask = this.labels.map(() => 0);
     // this.backlogTask.pop();
      // this.backlogTask.push(this.totalThreePointEstimateOfBacklog/3600);
      if (!this.labels.includes("Backlog Task"))
        this.labels.push("Backlog Task");


      console.log(this.backlogTask, this.labels);
      this.updateGraph();
    });



  }
  public barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    scales: {
      x: {
        position: "bottom", // Show x-axis labels at the bottom

        grid: {
          display: false, // Set to false to hide grid lines for x-axis
        },
        ticks: {
          display: false,
        },
      },

      y: {
        display: true,
        position: "left", // Position the y-axis on the left side
        title: {
          display: true,
          text: "Estimation", // Add the title 'Estimation' to the y-axis
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
          // boxWidth:30,
          textAlign: "left",
          font: {
            size: 8,
          },
        },
      },
      tooltip: {},
    },
  };
  pagination = [
    "S-1",
    "S-2",
    "S-3",
    "S-4",
    "S-5",
    "S-6",
    "S-7",
    "S-8",
    "S-9",
    "S-10",

  ];
  public barChartLabels: any[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];

  updateGraph() {
    this.barChartLabels = this.labels;
    this.barChartLegend = true;
    this.barChartData = [
      {
        label: "Total Scope",
        data: this.scopeForSprint,
        type: "line",
        backgroundColor: "rgb(79, 129, 189)",
        borderColor: "rgb(79, 129, 189)",
        pointBackgroundColor: "rgb(79, 129, 189)",
        pointBorderColor: "rgb(79, 129, 189)",
        pointHoverBorderColor: "rgb(79, 129, 189)",
        pointHoverBackgroundColor: "rgb(79, 129, 189)",
        // pointStyle: false,
      },
      {
        label: "Velocity",
        data: this.sumOfVelocity,
        type: "line",
        backgroundColor: "rgb(44, 77, 117)",
        borderColor: "rgb(44, 77, 117)",
        pointBackgroundColor: "rgb(44, 77, 117)",
        pointBorderColor: "rgb(44, 77, 117)",
        // pointStyle: false,
      },
      {
        data: this.completedTask,
        label: "Completed",
        backgroundColor: "rgb(247, 150, 70)",
        borderColor: "rgb(247, 150, 70)",
        pointBackgroundColor: "rgb(247, 150, 70)",
        pointBorderColor: "rgb(247, 150, 70)",
        // pointStyle: false,
        type: "line",
      },

      {
        data: this.notStartedTask,
        label: "Not Started",
        stack: "a",
        backgroundColor: "rgb(93, 138, 192)",
        // borderColor: 'black',
        // pointStyle: false,
        type: "bar",
        maxBarThickness: 30
      },

      {
        label: "Planned",
        hidden: false,
        type: "bar",
        stack: "a",
        data: this.totalPlanned,
        backgroundColor: "rgb(128, 100, 162)",
        borderColor: "rgb(128, 100, 162)",
        hoverBackgroundColor: "rgb(128, 100, 162)",
        maxBarThickness: 30
      },
      {
        data: this.overEstimate,
        label: "Over Estimate",
        backgroundColor: "rgb(119, 44, 42)",
        stack: "a",
        pointStyle: false,
        type: "bar",
        maxBarThickness: 30
      },
      // {
      //   data: this.backlogTask,
      //   label: "Backlog",
      //   backgroundColor: "red",
      //   stack: "a",
      //   pointStyle: false,
      //   type: "bar",
      //   maxBarThickness: 30
      // },
    ];
  }
  onMouseEnterDialog() {
    this.mouseInsideDialog = true;
  }
  onMouseLeaveDialog() {
    if (this.mouseInsideDialog) {
      this.dialog.closeAll();
    }
  }
  ngOnDestroy(): void {

    this.pagination = [];
    this.pageFilterDefault = "";
    this.p = 0;
  }


}
