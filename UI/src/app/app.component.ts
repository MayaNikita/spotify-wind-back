import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CanvasJS } from '@canvasjs/angular-charts';
import { BehaviorSubject, map, Observable, startWith, Subject } from 'rxjs';
import { StatsService } from './services/stats.service';
import { Router } from '@angular/router';
import { FilterObject } from './dto/filterObject';
import { msToHours } from './helpers/date-helper';
CanvasJS.addColorSet('greenShades', [
  //colorSet Array

  '#2F4F4F',
  '#008080',
  '#2E8B57',
  '#3CB371',
  '#90EE90',
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'UI';

  artistList: string[] = [];
  songList: string[] = [];

  minDate: string = '';
  maxDate: string = '';

  startDateControl = new FormControl('');
  endDateControl = new FormControl('');
  myControl = new FormControl('');
  songControl = new FormControl('');

  filteredOptions: Observable<string[]> | undefined;
  filteredSongOptions: Observable<string[]> | undefined;

  filterObject: FilterObject = {};

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getDateRange(this.filterObject).subscribe((a: any) => {
      this.minDate = a.min;
      this.maxDate = a.max;
    });

    this.getStats();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.filteredSongOptions = this.songControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._songFilter(value || ''))
    );
  }

  getStats() {
    this.artistList = [];
    this.statsService.getArtists(this.filterObject).subscribe((a: any) => {
      this.artistList = a;
    });

    this.songList = [];
    this.statsService.getSongs(this.filterObject).subscribe((a: any) => {
      this.songList = a;
    });

    this.getStreamStartReasonData();
    this.getStreamedTimeBySongData();
    this.getStreamedTimeByArtistData();
  }

  updateFilters() {
    this.filterObject.artist = this.myControl.value ?? '';
    this.filterObject.song = this.songControl.value ?? '';
    if (this.startDateControl.value && this.endDateControl.value) {
      this.filterObject.dateFrom = this.startDateControl.value;
      this.filterObject.dateTo = this.endDateControl.value;
    }
    this.filterObject = { ...this.filterObject };

    this.getStats();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.artistList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _songFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.songList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  streamStartReasonData: any[] = [];
  getStreamStartReasonData() {
    this.streamStartReasonData = [];

    this.statsService.getStreamReason(this.filterObject).subscribe((a: any) => {
      this.streamStartReasonData = a.reason_start.map((reason: any) => {
        return {
          name: reason.name,
          y: reason.streams,
        } as never;
      });
    });
  }

  streamedTimeByArtistData: any[] = [];
  getStreamedTimeByArtistData() {
    this.streamedTimeByArtistData = [];

    this.statsService
      .getStreamedTimeByArtist(this.filterObject)
      .subscribe((a: any) => {
        this.streamedTimeByArtistData = a.map((song: any) => {
          return {
            name: song.name,
            y: msToHours(song.ms_played),
          } as never;
        });
      });
  }

  streamedTimeBySongData: any[] = [];
  getStreamedTimeBySongData() {
    this.streamedTimeBySongData = [];

    this.statsService
      .getStreamedTimeBySong(this.filterObject)
      .subscribe((a: any) => {
        this.streamedTimeBySongData = a.map((song: any) => {
          return {
            name: song.name,
            y: msToHours(song.ms_played),
          } as never;
        });
      });
  }
}
