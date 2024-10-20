import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { StatsService } from 'src/app/services/stats.service';
import { Stream } from '../../../../../stream';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  msPlayed: number | null = null;
  artistList: string[] = [];
  streams: Stream[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    //this.getStats();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.msPlayed = 1;
    this.statsService.getStats().subscribe((a: any) => {
      this.msPlayed = a.message;
    });
  }

  /*   getStats() {
    this.artistList = [];
    this.statsService.getArtists().subscribe((a: any) => {
      this.artistList = a.message;
    });
  } */

  loadStreams() {
    this.streams = [];
    this.statsService
      .getStreams(this.myControl.value ?? '')
      .subscribe((a: any) => {
        this.streams = a.message;
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.artistList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  formatDate(ts: string): string {
    const format = 'dd.MM.yyyy';
    const locale = 'en-US';
    return formatDate(ts, format, locale);
  }

  getTotalStreamingDuration(): number {
    return Math.round(
      this.streams.reduce((sum, current) => sum + current.ms_played, 0) /
        1000 /
        60 /
        60
    );
  }
}
