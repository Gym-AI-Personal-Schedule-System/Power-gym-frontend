import {Component} from '@angular/core';
import {routes} from 'src/app/core/routes-path/routes';
import {ChartData, ChartOptions} from "chart.js";
import {UserService} from "../../../api-service/service/UserService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public routes = routes;
  public ageData = [];
  // public ageData = [
  //   {age: 20, count: 10},
  //   {age: 22, count: 2},
  //   {age: 25, count: 5},
  //   {age: 30, count: 8},
  //   {age: 35, count: 3},
  //   {age: 40, count: 7},
  //   {age: 50, count: 7},
  // ];

  constructor(private userService: UserService) {
    this.LoadAgeWiseUserData();
    // this.updateChartData();
  }

  private LoadAgeWiseUserData() {
    this.userService.getAgeWiseMemberCount().subscribe(value => {
      if (value.statusCode === 200) {
        this.ageData = value.data;
        this.updateChartData();  // Update chart data with new backend values
      }
    });
  }

  public dotChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {display: true, text: 'Age'},
        type: 'linear',
        position: 'bottom'
      },
      y: {
        title: {display: true, text: 'Count'},
        beginAtZero: true,
        ticks: {
          stepSize: 1,  // Ensures only whole numbers are shown
          callback: function (value) {
            return Number(value).toFixed(0);
          } // Display whole numbers only
        },
      },
    },
    plugins: {
      legend: {display: false},
    },
  }

  private generateColors(length: number) {
    // Define a set of colors, then repeat if needed
    const baseColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ];
    return Array.from({length}, (_, i) => baseColors[i % baseColors.length]);
  }

  private updateChartData() {
    const colors = this.generateColors(this.ageData.length); // Dynamic colors for each data point
    this.dotChartData = {
      datasets: [{
        label: 'Age vs. Count',
        data: this.ageData.map((item, index) => ({
          x: item.age,
          y: item.count,
        })),
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.6', '1')),
        pointRadius: 5,
      }],
    };
  }

  public dotChartData: ChartData<'scatter'> = {
    datasets: []
  }
}
