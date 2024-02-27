import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-graph',
  templateUrl: './task-graph.component.html',
  styleUrls: ['./task-graph.component.scss'],
})
export class TaskGraphComponent implements OnInit {
  taskData: any = {}; // Change the type to object
  barChartData: any[] = [];
  barChartLabels: any[] = [];

  constructor(private sprintService: SprintService
    ) { }

  ngOnInit() {
    this.sprintService.sharedItem$.subscribe((res) => {
      this.taskData = res;
      console.log(res);
      this.updateChart();
    });
  }

  updateChart() {
    // Update chart data and labels based on taskData
    this.barChartData = [
      { data: [this.taskData.sumOfAiEstimate], label: 'AI estimate', backgroundColor: 'yellow' },
      { data: [this.taskData.sumOfOriginalEstimate], label: 'Original estimate', backgroundColor: 'black' },
    ];

    this.barChartLabels = ["Sprint id:"+this.taskData.sprintId];
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'black' 
        }
      },
      y: {
        ticks: {
          color: 'black' 
        }
      }
    },
    barPercentage: .85,
    categoryPercentage: .30
  };
  public barChartType = 'bar';
  public barChartLegend = true;
}
