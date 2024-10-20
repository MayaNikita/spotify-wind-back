import { Component, Input, SimpleChanges } from '@angular/core';
import { dayToWeekday, msToHours } from 'src/app/helpers/date-helper';
import { FilterObject } from 'src/app/dto/filterObject';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-streamed-time',
  templateUrl: './streamed-time.component.html',
  styleUrls: ['./streamed-time.component.scss'],
})
export class StreamedTimeComponent {
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

    this.statsService.getStreamedTime(this.filter).subscribe((a: any) => {
      this.msPlayed = a.ms_played;
    });
  }

  getTotalStreamingDuration(ms: number): number {
    return msToHours(ms);
  }

  msFormat(ms: number): string {
    let duration: string = '';

    let months: number = Math.floor(ms / 1000 / 60 / 60 / 24 / 30);
    let days: number = Math.floor(
      (ms / 1000 / 60 / 60 / 24 / 30 - months) * 30
    );
    let weeks = Math.floor(days / 7);
    days -= weeks * 7;
    let hours: number = Math.floor(
      ((ms / 1000 / 60 / 60 / 24 / 30 - months) * 30 - days) * 24
    );
    let minutes: number = Math.floor(
      (((ms / 1000 / 60 / 60 / 24 / 30 - months) * 30 - days) * 24 - hours) * 60
    );
    let seconds: number = Math.floor(
      ((((ms / 1000 / 60 / 60 / 24 / 30 - months) * 30 - days) * 24 - hours) *
        60 -
        minutes) *
        60
    );

    if (months) duration += months + ' months ';
    if (weeks) duration += weeks + ' weeks ';
    if (days) duration += days + ' days ';
    if (hours) duration += hours + ' hours ';
    if (minutes) duration += minutes + ' min ';
    if (seconds) duration += seconds + ' sec';
    return duration;
  }
}
