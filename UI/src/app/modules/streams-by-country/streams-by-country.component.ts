import { Component, Input, SimpleChanges } from '@angular/core';
import { dayToWeekday, msToHours } from 'src/app/helpers/date-helper';
import { FilterObject } from 'src/app/dto/filterObject';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-streams-by-country',
  templateUrl: './streams-by-country.component.html',
  styleUrls: ['./streams-by-country.component.scss'],
})
export class StreamsByCountryComponent {
  chartOptions = {
    animationEnabled: true,
    theme: 'dark2',
    colorSet: 'greenShades',
    backgroundColor: 'transparent',
    title: {
      text: 'Streamed Time by Country',
    },
    data: [
      {
        type: 'pie',
        indexLabel: '{name}',
        indexLabelPlacement: 'inside',
        yValueFormatString: '0.## hours',
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
      .getStreamedTimeByCountry(this.filter)
      .subscribe((a: any) => {
        let result: any[] = [];

        a.reduce(function (res: any, value: any) {
          if (value['name'] == null) return res;
          /*           if (value['name'].toLowerCase().includes('windows'))
            value['name'] = 'Windows';
          if (value['name'].toLowerCase().includes('ios'))
            value['name'] = 'iOS'; */
          if (!res[value['name']]) {
            res[value['name']] = { name: value['name'], ms_played: 0 };
            result.push(res[value['name']]);
          }
          res[value['name']].ms_played += value.ms_played;
          return res;
        }, {});

        this.chartOptions.data[0].dataPoints = result.map((country: any) => {
          return {
            name: country.name,
            y: msToHours(country.ms_played),
          } as never;
        });
      });
  }
}
