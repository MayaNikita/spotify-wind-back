import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './modules/stats/stats.component';
import { ArtistsComponent } from './modules/artists/artists.component';
import { TimespanComponent } from './modules/timespan/timespan.component';

const routes: Routes = [
  { path: '', redirectTo: 'stats', pathMatch: 'full' }, //default route
  { path: 'stats', component: StatsComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'timespan', component: TimespanComponent },
  { path: '**', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
