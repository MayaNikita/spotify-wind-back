import { Component, Input, SimpleChanges } from '@angular/core';
import { FilterObject } from 'src/app/dto/filterObject';
import { msToHours } from 'src/app/helpers/date-helper';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() title: string = '';
  @Input() unit: string = '';
  @Input() data: any[] = [];

  chartOptions = {
    animationEnabled: true,
    theme: 'dark2',
    colorSet: 'greenShades',
    backgroundColor: 'transparent',
    title: {
      text: this.title + 's',
    },
    data: [
      {
        type: 'pie',
        indexLabel: '{name}',
        indexLabelPlacement: 'inside',
        yValueFormatString: '0.##',
        dataPoints: [],
      },
    ],
  };

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.chartOptions.title.text = this.title;
    this.chartOptions.data[0].yValueFormatString = `0.## ${this.unit}`;

    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].previousValue != changes['data'].currentValue) {
      this.loadData();
    }
  }

  loadData() {
    this.chartOptions.data[0].dataPoints = this.data as never[];
  }
}
