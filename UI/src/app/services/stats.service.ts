import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterObject } from '../dto/filterObject';
import { formatFilterQueryString } from '../helpers/api-helper';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any[]>('http://localhost:3000/msg');
  }

  getStreams(artist: String) {
    return this.http.get<any[]>(
      `http://localhost:3000/streams?artist=${artist}`
    );
  }

  getDateRange(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/daterange?${formatFilterQueryString(filter)}`
    );
  }

  getArtists(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/artist/all?${formatFilterQueryString(filter)}`
    );
  }

  getSongs(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/song/all?${formatFilterQueryString(filter)}`
    );
  }

  getStreamedTime(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime?${formatFilterQueryString(filter)}`
    );
  }

  getAverageDailyStreamedTime(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/averageTime?${formatFilterQueryString(filter)}`
    );
  }

  getStreamedTimeByArtist(filter: FilterObject, limit: number = 10) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime/artist?limit=${limit}&${formatFilterQueryString(
        filter
      )}`
    );
  }

  getStreamedTimeBySong(filter: FilterObject, limit: number = 10) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime/song?limit=${limit}&${formatFilterQueryString(
        filter
      )}`
    );
  }

  getStreamedTimeByCountry(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime/platform?${formatFilterQueryString(
        filter
      )}`
    );
  }

  getStreamReason(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime/reason?${formatFilterQueryString(
        filter
      )}`
    );
  }

  getStreamsByMonth(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime/month?${formatFilterQueryString(
        filter
      )}`
    );
  }

  getStreamsByDay(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime/day?${formatFilterQueryString(
        filter
      )}`
    );
  }

  getStreamsByHour(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/streamedTime/hour?${formatFilterQueryString(
        filter
      )}`
    );
  }

  getAverageStreamsByWeekday(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/averageTime/weekday?${formatFilterQueryString(
        filter
      )}`
    );
  }

  getSkippedStreamCount(filter: FilterObject) {
    return this.http.get<any[]>(
      `http://localhost:3000/skipped?${formatFilterQueryString(filter)}`
    );
  }
}
