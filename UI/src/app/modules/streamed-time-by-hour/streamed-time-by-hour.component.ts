import { Component, Input, SimpleChanges } from '@angular/core';
import { FilterObject } from 'src/app/dto/filterObject';
import { dayToWeekday, msToHours } from 'src/app/helpers/date-helper';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-streamed-time-by-hour',
  templateUrl: './streamed-time-by-hour.component.html',
  styleUrls: ['./streamed-time-by-hour.component.scss'],
})
export class StreamedTimeByHourComponent {
  chartOptions = {
    theme: 'dark2',
    backgroundColor: 'transparent',
    colorSet: 'greenShades',
    animationEnabled: true,
    axisY: {
      minimum: 0,
    },
    axisX: {
      interval: 2,
      intervalType: 'hour',
    },
    title: {
      text: 'Streamed Time by Hour',
    },
    data: [
      {
        type: 'spline',
        color: '#3CB371',
        fillOpacity: 1,
        yValueFormatString: '0.## hours',
        xValueFormatString: "00':00'",
        dataPoints: [],
      },
    ],
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

    this.statsService.getStreamsByHour(this.filter).subscribe((a: any[]) => {
      this.chartOptions.data[0].dataPoints = a.map((hour) => {
        return {
          x: hour.hour,
          y: msToHours(hour.ms_played),
        } as never;
      });
    });
  }
}
