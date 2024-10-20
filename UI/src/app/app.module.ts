import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent } from './modules/stats/stats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ArtistsComponent } from './modules/artists/artists.component';
import { TimespanComponent } from './modules/timespan/timespan.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { StreamsByCountryComponent } from './modules/streams-by-country/streams-by-country.component';
import { StreamedTimeComponent } from './modules/streamed-time/streamed-time.component';
import { AvgStreamedTimeByWeekdayComponent } from './modules/avg-streamed-time-by-weekday/avg-streamed-time-by-weekday.component';
import { MatNativeDateModule } from '@angular/material/core';
import { StreamedTimeByHourComponent } from './modules/streamed-time-by-hour/streamed-time-by-hour.component';
import { AvgStreamedTimePerDayComponent } from './modules/avg-streamed-time-per-day/avg-streamed-time-per-day.component';
import { SkippedStreamsComponent } from './modules/skipped-streams/skipped-streams.component';
import { PieChartComponent } from './shared/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    ArtistsComponent,
    TimespanComponent,
    StreamsByCountryComponent,
    StreamedTimeComponent,
    AvgStreamedTimeByWeekdayComponent,
    StreamedTimeByHourComponent,
    AvgStreamedTimePerDayComponent,
    SkippedStreamsComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
