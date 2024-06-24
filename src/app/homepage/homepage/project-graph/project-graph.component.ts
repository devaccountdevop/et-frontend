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
  // totalActualEstimate = 0;
  // totalRemaining = 0;
  // averageVelocity = 0;
  // totalThreePointEstimate = 0;
  // totalRiskFactors = 0;
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
    this.noOfDays = [];

    this.sprintService.sharedItem$.subscribe((item: any) => {
      this.labels = [];
      if (item.sprintInfoDtos.length == 0) {
        this.sprintDates = [];
      } else {
        item.sprintInfoDtos.forEach((sprintInfoDto: any, index: number) => {
          const doneTasksInSprint = sprintInfoDto.taskDetails.filter(
            (task: any) => task.taskStatus === "Done"
          );
          const notStartedTasksInSprint = sprintInfoDto.taskDetails.filter(
            (task: any) => task.taskStatus === "To Do"
          );

          const completedTaskSum = doneTasksInSprint.reduce((sum: number, task: any) => {
            return sum + parseFloat(task.originalEstimate);
          }, 0);

          const notStartedTaskSum = notStartedTasksInSprint.reduce((sum: number, task: any) => {
            return sum + parseFloat(task.originalEstimate);
          }, 0);

          const sumOfOriginalEstimate = sprintInfoDto.taskDetails.reduce((sum: number, task: any) => {
            return sum + parseFloat(task.originalEstimate);
          }, 0);
          const sumOfVelocity = sprintInfoDto.taskDetails.reduce((sum: number, task: any) => {
            if (task.storyPoints == null) {
              return sum;
            }
            return sum + parseFloat(task.storyPoints);
          }, 0);

          const sumOfThreePointEstimate = sprintInfoDto.taskDetails.reduce((sum: number, task: any) => {
            if (task.threePointEstimate == null) {
              return 0;
            }
            return sum + parseFloat(task.threePointEstimate);
          }, 0);

          const doneTasksOriginalEstimateHours = completedTaskSum / 3600;
          const notStartedTasksOriginalEstimateHours = notStartedTaskSum / 3600;
          this.totalScope.push(sumOfThreePointEstimate);
          this.sumOfVelocity.push(sumOfVelocity * 8);
          this.totalPlanned.push(sumOfOriginalEstimate / 3600);
          this.completedTask.push(doneTasksOriginalEstimateHours);
          this.notStartedTask.push(notStartedTasksOriginalEstimateHours);

          let aiEstimateSum = 0;
          let originalEstimateSum = 0;
          let sumofworklogs = 0;
          doneTasksInSprint.forEach((task: any) => {
            aiEstimateSum += parseFloat(task.aiEstimate);
            originalEstimateSum += parseFloat(task.originalEstimate);
            if (task.worklogs && task.worklogs.length > 0) {
              let worklogestimate = 0;
              task.worklogs.forEach((worklog: any) => {
                worklogestimate += parseFloat(worklog.timeSpentSeconds);
              });
              sumofworklogs += worklogestimate;
            }
          });

          this.aisumofaiestimate.push(aiEstimateSum);
          this.sumoforiginal.push(originalEstimateSum);
          this.sumofworklogs.push(sumofworklogs / 3600);
          const sprintNumber = sprintInfoDto.sprintName.split(' ').pop();
          this.labels.push(`S-${sprintNumber}`);
          const startDate = new Date(sprintInfoDto.startDate);
          const endDate = new Date(sprintInfoDto.endDate);
          const sprintDurationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
          this.noOfDays.push(sprintDurationInDays);
        });

        this.overEstimate = this.sumofworklogs.map((worklog, index) => {
          const planned = this.totalPlanned[index];
          const over = worklog - planned;
          return over < 0 ? 0 : over;
        });

        console.log(this.completedTask, this.notStartedTask, this.sumofworklogs, this.totalPlanned, this.overEstimate, this.sumOfVelocity, this.noOfDays);
        const secondsPer8HourWorkday = 60 * 60;
        this.originalEstimateData = this.sumoforiginal.map(
          (sumInSeconds) => sumInSeconds / secondsPer8HourWorkday
        );
        const aiEstimateInDays = this.aisumofaiestimate.map(
          (sumInSeconds) => sumInSeconds
        );
        this.workLogEstimateData = this.sumofworklogs.map(
          (sumInSeconds) => sumInSeconds / secondsPer8HourWorkday
        );
      }

      this.backlogTaskfetch();
    });
  }
  async backlogTaskfetch() {
    await this.sprintService.backlogTask.subscribe((res) => {
      this.backlogTask = [];
      const backlogTask = res;
      this.totalThreePointEstimateOfBacklog;
      if (backlogTask != null) {
        const sumOfThreePointEstimatess = backlogTask.reduce((sum: number, task: any) => {
          if (task.threePointEstimate == null) {
            return sum;
          }
          return sum + parseFloat(task.threePointEstimate);
        }, 0);
        this.totalThreePointEstimateOfBacklog = sumOfThreePointEstimatess;
      }

      this.backlogTask = this.labels.map(() => 0);
      this.backlogTask.pop();
      this.backlogTask.push(this.totalThreePointEstimateOfBacklog);
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
        data: this.totalScope,
        type: "line",
        backgroundColor: "rgb(79, 129, 189)",
        borderColor: "rgb(79, 129, 189)",
        pointBackgroundColor: "rgb(79, 129, 189)",
        pointBorderColor: "rgb(79, 129, 189)",
        pointHoverBorderColor: "rgb(79, 129, 189)",
        pointHoverBackgroundColor: "rgb(79, 129, 189)",
        pointStyle: false,
      },
      {
        label: "Velocity",
        data: this.sumOfVelocity,
        type: "line",
        backgroundColor: "rgb(44, 77, 117)",
        borderColor: "rgb(44, 77, 117)",
        pointBackgroundColor: "rgb(44, 77, 117)",
        pointBorderColor: "rgb(44, 77, 117)",
        pointStyle: false,
      },
      {
        data: this.completedTask,
        label: "Completed",
        backgroundColor: "rgb(247, 150, 70)",
        borderColor: "rgb(247, 150, 70)",
        pointBackgroundColor: "rgb(247, 150, 70)",
        pointBorderColor: "rgb(247, 150, 70)",
        pointStyle: false,
        type: "line",
      },

      {
        data: this.notStartedTask,
        label: "Not Started",
        stack: "a",
        backgroundColor: "rgb(93, 138, 192)",
        // borderColor: 'black',
        pointStyle: false,
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
      {
        data: this.backlogTask,
        label: "Three Point Estimate",
        backgroundColor: "red",
        stack: "a",
        pointStyle: false,
        type: "bar",
        maxBarThickness: 30
      },
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
