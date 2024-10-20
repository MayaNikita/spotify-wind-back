import { Component, Input, SimpleChanges } from '@angular/core';
import { FilterObject } from 'src/app/dto/filterObject';
import { daysInMonth, msToHours } from 'src/app/helpers/date-helper';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-timespan',
  templateUrl: './timespan.component.html',
  styleUrls: ['./timespan.component.scss'],
})
export class TimespanComponent {
  chartOptions = {
    theme: 'dark2',
    backgroundColor: 'transparent',
    colorSet: 'greenShades',
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Streamed Time by Date',
    },

    legend: {
      cursor: 'pointer',
      verticalAlign: 'top',
      horizontalAlign: 'center',
      dockInsidePlotArea: true,
      //itemclick: toogleDataSeries
    },
    axisY: {
      title: 'Hours',
      dockInsidePlotArea: true,
    },
    axisX: {
      intervalType: 'year',
    },
    data: [
      {
        name: 'Hours streamed',
        showInLegend: true,
        type: 'spline',
        color: '#3CB371',
        xValueType: 'dateTime',
        xValueFormatString: 'DD. MMMM YYYY',
        yValueFormatString: '0.## hours',
        dataPoints: [],
      },
      {
        name: 'Ø Hour Streamed that month',
        showInLegend: true,
        type: 'spline',
        color: '#90EE90',
        xValueType: 'dateTime',
        xValueFormatString: 'MMMM YYYY',
        yValueFormatString: 'Ø 0.## hours per day',
        dataPoints: [],
      },
    ],
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
            round: 'month',
          },
        },
      },
    },
  };
  @Input() filter!: FilterObject;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'].previousValue != changes['filter'].currentValue) {
      this.loadData();
    }
  }

  loadData() {
    this.chartOptions.data[0].dataPoints = [];
    this.chartOptions.data[1].dataPoints = [];

    this.statsService.getStreamsByDay(this.filter).subscribe((a: any) => {
      this.chartOptions.data[0].dataPoints = a.map((date: any) => {
        return {
          x: date.date,
          y: msToHours(date.ms_played),
        } as never;
      });
    });

    this.statsService.getStreamsByMonth(this.filter).subscribe((a: any) => {
      this.chartOptions.data[1].dataPoints = a.map((date: any) => {
        let month = new Date(date.date);
        month.setDate(0);
        return {
          x: month,
          y:
            msToHours(date.ms_played) /
            daysInMonth(month.getMonth(), month.getFullYear()),
        } as never;
      });
    });
  }
}
