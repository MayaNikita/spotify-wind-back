import { Component, Input, SimpleChanges } from '@angular/core';
import { dayToWeekday, msToHours } from 'src/app/helpers/date-helper';
import { FilterObject } from 'src/app/dto/filterObject';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-avg-streamed-time-by-weekday',
  templateUrl: './avg-streamed-time-by-weekday.component.html',
  styleUrls: ['./avg-streamed-time-by-weekday.component.scss'],
})
export class AvgStreamedTimeByWeekdayComponent {
  chartOptions = {
    theme: 'dark2',
    backgroundColor: 'transparent',
    colorSet: 'greenShades',
    animationEnabled: true,
    axisY: {
      minimum: 0,
    },
    title: {
      text: 'Ø Streamed Time by Weekday',
    },
    data: [
      {
        type: 'column',
        yValueFormatString: 'Ø 0.## hours',
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

    this.statsService
      .getAverageStreamsByWeekday(this.filter)
      .subscribe((a: any[]) => {
        let formattedData: { label: string; y: number }[] = a.map((date) => {
          return {
            label: dayToWeekday(date.date),
            y: msToHours(date.avg_ms_played),
          };
        });

        formattedData.push(formattedData.shift()!);
        this.chartOptions.data[0].dataPoints = formattedData as never[];
      });
  }
}
