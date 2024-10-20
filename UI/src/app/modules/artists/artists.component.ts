import { Component } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent {
  artistsByStreamedTime: any[] = [];

  constructor(private statsService: StatsService) {}

  /*   ngOnInit() {
    this.statsService
      .getStreamedTimeByArtist()
      .subscribe((a: any) => (this.artistsByStreamedTime = a.message));
  } */

  getTotalStreamingDuration(ms: number): number {
    return Math.round((ms * 10) / 1000 / 60 / 60) / 10;
  }

  msToSeconds(ms: number): number {
    return Math.round((ms * 10) / 1000) / 10;
  }
}
