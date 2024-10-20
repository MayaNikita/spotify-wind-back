import { Component, Input, SimpleChanges } from '@angular/core';
import { FilterObject } from 'src/app/dto/filterObject';
import { msToHours } from 'src/app/helpers/date-helper';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-avg-streamed-time-per-day',
  templateUrl: './avg-streamed-time-per-day.component.html',
  styleUrls: ['./avg-streamed-time-per-day.component.scss'],
})
export class AvgStreamedTimePerDayComponent {
  @Input() filter!: FilterObject;
  msPlayed: number | undefined;

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
    this.msPlayed = undefined;

    this.statsService
      .getAverageDailyStreamedTime(this.filter)
      .subscribe((a: any) => {
        this.msPlayed = a.avg_ms_played;
      });
  }

  getTotalStreamingDuration(ms: number): number {
    return msToHours(ms);
  }
}
