import { Component, Input, SimpleChanges } from '@angular/core';
import { FilterObject } from 'src/app/dto/filterObject';
import { msToHours } from 'src/app/helpers/date-helper';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-skipped-streams',
  templateUrl: './skipped-streams.component.html',
  styleUrls: ['./skipped-streams.component.scss'],
})
export class SkippedStreamsComponent {
  chartOptions = {
    animationEnabled: true,
    theme: 'dark2',
    colorSet: 'greenShades',
    backgroundColor: 'transparent',

    data: [
      {
        type: 'pie',
        indexLabel: '{name}',
        indexLabelPlacement: 'inside',
        yValueFormatString: '0 Streams',
        dataPoints: [],
      },
    ],
  };

  constructor(private statsService: StatsService) {}
  @Input() filter!: FilterObject;

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes['filter'].previousValue != changes['filter'].currentValue) {
      this.loadData();
    }
  }

  loadData() {
    this.chartOptions.data[0].dataPoints = [];

    this.statsService.getSkippedStreamCount(this.filter).subscribe((a: any) => {
      this.chartOptions.data[0].dataPoints = [
        {
          name: 'Not skipped',
          y: a.streams - a.skippedStreams,
        } as never,
        {
          name: 'Skipped',
          y: a.skippedStreams,
        } as never,
      ];
    });
  }
}
