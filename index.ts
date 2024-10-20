import streams1 from "./Spotify Extended Streaming History/Streaming_History_Audio_2019-2021_0.json"; // This import style requires "esModuleInterop", see "side notes"
import streams2 from "./Spotify Extended Streaming History/Streaming_History_Audio_2021-2022_1.json";
import streams3 from "./Spotify Extended Streaming History/Streaming_History_Audio_2022_2.json";
import streams4 from "./Spotify Extended Streaming History/Streaming_History_Audio_2022-2023_3.json";
import streams5 from "./Spotify Extended Streaming History/Streaming_History_Audio_2023-2024_4.json";
import streams6 from "./Spotify Extended Streaming History/Streaming_History_Audio_2024_5.json";
import { Stream, StreamingTimeGroup } from "./stream";
import { FilterObject } from "./UI/src/app/dto/filterObject";

const STREAMS: Stream[] = [...(streams1 as Stream[]), ...(streams2 as Stream[]), ...(streams3 as Stream[]), ...(streams4 as Stream[]), ...(streams5 as Stream[]), ...(streams6 as Stream[])];
const MIN_DATE: string = STREAMS[0].ts;
const MAX_DATE: string = STREAMS[STREAMS.length - 1].ts;

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.listen(3000, () => {
  console.log("---------------------------");
  console.log("Server running on port 3000");
  console.log("---------------------------");
});

function streamedTimeBy(attribute: string, filters?: FilterObject): StreamingTimeGroup[] {
  let result: StreamingTimeGroup[] = [];
  getFilteredStreams(filters).reduce(function (res, value) {
    if (value[attribute] == null) return res;
    if (!res[value[attribute]]) {
      res[value[attribute]] = { name: value[attribute], ms_played: 0, streams: 0, avg_stream_duration: 0 };
      result.push(res[value[attribute]]);
    }
    res[value[attribute]].ms_played += value.ms_played;
    res[value[attribute]].streams += 1;
    res[value[attribute]].avg_stream_duration = res[value[attribute]].ms_played / res[value[attribute]].streams;
    return res;
  }, {});

  return result.sort((firstItem, secondItem) => firstItem.ms_played - secondItem.ms_played).reverse();
}

function getFilteredStreams(filters: FilterObject): Stream[] {
  let dateFrom = new Date(filters.dateFrom).getTime();
  let dateTo = new Date(filters.dateTo).getTime();
  return STREAMS.filter((stream) => (filters.artist ? stream.master_metadata_album_artist_name == filters.artist : true))
    .filter((stream) => (filters.song ? stream.master_metadata_track_name == filters.song : true))
    .filter((stream) => (dateFrom && dateTo ? new Date(stream.ts).getTime() >= dateFrom && new Date(stream.ts).getTime() <= dateTo : true));
}

// LIST ALL
app.get("/daterange", (req, res, next) => {
  res.json({ min: MIN_DATE, max: MAX_DATE });
});

app.get("/artist/all", (req, res, next) => {
  res.json(Array.from(new Set(STREAMS.filter((stream) => (req.query["song"] ? stream.master_metadata_track_name == req.query["song"] : true)).map((stream: Stream) => stream.master_metadata_album_artist_name ?? "undefined"))));
});

app.get("/song/all", (req, res, next) => {
  res.json(Array.from(new Set(STREAMS.filter((stream) => (req.query["artist"] ? stream.master_metadata_album_artist_name == req.query["artist"] : true)).map((stream: Stream) => stream.master_metadata_track_name ?? "undefined"))));
});

app.get("/streams", (req, res, next) => {
  res.json(
    STREAMS.filter((stream: Stream) => {
      return stream.master_metadata_album_artist_name == req.query["artist"];
    })
  );
});

app.get("/streams/byDay", (req, res, next) => {
  var result = [];
  STREAMS.reduce(function (res, value) {
    let currentDate = new Date(value.ts);
    //currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let currentDateString = currentDate.toDateString();

    if (!res[currentDateString]) {
      res[currentDateString] = { date: currentDate, streams: 0 };
      result.push(res[currentDateString]);
    }
    res[currentDateString].streams += 1;
    return res;
  }, {});

  res.json(result);
});

// STREAMED TIME BY
app.get("/streamedTime", (req, res, next) => {
  res.json({
    ms_played: getFilteredStreams(req.query).reduce((sum, current) => sum + current.ms_played, 0),
  });
});

app.get("/streamedTime/artist", (req, res, next) => {
  res.json(streamedTimeBy("master_metadata_album_artist_name", req.query).slice(0, req.query["limit"]));
});

app.get("/streamedTime/song", (req, res, next) => {
  res.json(streamedTimeBy("master_metadata_track_name", req.query).slice(0, req.query["limit"]));
});

app.get("/streamedTime/country", (req, res, next) => {
  res.json(streamedTimeBy("conn_country", req.query).slice(0, req.query["limit"]));
});

app.get("/streamedTime/platform", (req, res, next) => {
  res.json(streamedTimeBy("platform", req.query).slice(0, req.query["limit"]));
});

app.get("/streamedTime/reason", (req, res, next) => {
  res.json({ reason_start: streamedTimeBy("reason_start", req.query).slice(0, req.query["limit"]), reason_end: streamedTimeBy("reason_end", req.query).slice(0, req.query["limit"]) });
});

app.get("/streamedTime/month", (req, res, next) => {
  var result = [];
  getFilteredStreams(req.query).reduce(function (res, value) {
    let currentDate = new Date(value.ts);
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let currentDateString = currentDate.toDateString();

    if (!res[currentDateString]) {
      res[currentDateString] = { date: currentDate, ms_played: 0 };
      result.push(res[currentDateString]);
    }
    res[currentDateString].ms_played += value.ms_played;
    return res;
  }, {});

  res.json(result);
});

app.get("/streamedTime/day", (req, res, next) => {
  var result = [];
  getFilteredStreams(req.query).reduce(function (res, value) {
    let currentDate = new Date(value.ts).setHours(0, 0, 0);

    if (!res[currentDate]) {
      res[currentDate] = { date: currentDate, ms_played: 0 };
      result.push(res[currentDate]);
    }
    res[currentDate].ms_played += value.ms_played;
    return res;
  }, {});

  res.json(result);
});

app.get("/streamedTime/hour", (req, res, next) => {
  var result = [];
  getFilteredStreams(req.query).reduce(function (res, value) {
    let currentDate = new Date(value.ts).getHours();

    if (!res[currentDate]) {
      res[currentDate] = { hour: currentDate, ms_played: 0 };
      result.push(res[currentDate]);
    }
    res[currentDate].ms_played += value.ms_played;
    return res;
  }, {});

  res.json(result.sort((firstItem, secondItem) => firstItem.hour - secondItem.hour));
});

// STREAMED TIME BY
app.get("/averageTime", (req, res, next) => {
  let filteredStreams = getFilteredStreams(req.query);
  let msPlayed = filteredStreams.reduce((sum, current) => sum + current.ms_played, 0);
  let firstDate = new Date(filteredStreams[0].ts);
  let lastDate = new Date(filteredStreams[filteredStreams.length - 1].ts);
  firstDate.setHours(0, 0, 0);
  lastDate.setHours(0, 0, 0);
  let daysBetween = Math.round((lastDate.getTime() - firstDate.getTime()) / 1000 / 60 / 60 / 24) + 1;
  console.log("days:", daysBetween);

  let avgMsPlayed = msPlayed / daysBetween;

  res.json({
    avg_ms_played: Math.round(avgMsPlayed),
  });
});

app.get("/averageTime/weekday", (req, res, next) => {
  let filteredStreams = getFilteredStreams(req.query);
  let firstDate = new Date(filteredStreams[0].ts);
  let lastDate = new Date(filteredStreams[filteredStreams.length - 1].ts);
  firstDate.setHours(0, 0, 0);
  lastDate.setHours(0, 0, 0);
  let weeksBetween = (Math.round((lastDate.getTime() - firstDate.getTime()) / 1000 / 60 / 60 / 24) + 1) / 7;
  // Convert the difference from milliseconds to weeks by dividing it by the number of milliseconds in a week

  console.log("weeks:", weeksBetween);

  var result = [];

  filteredStreams.reduce(function (res, value) {
    let currentDate = new Date(value.ts);
    let currentWeekday = currentDate.getDay();

    if (!res[currentWeekday]) {
      res[currentWeekday] = { date: currentWeekday, ms_played: 0, avg_ms_played: 0 };
      result.push(res[currentWeekday]);
    }
    res[currentWeekday].ms_played += value.ms_played;
    res[currentWeekday].avg_ms_played = Math.round(res[currentWeekday].ms_played / weeksBetween);
    return res;
  }, {});

  res.json(result.sort((firstItem, secondItem) => firstItem.date - secondItem.date));
});

app.get("/skipped", (req, res, next) => {
  res.json({
    streams: getFilteredStreams(req.query).length,
    skippedStreams: getFilteredStreams(req.query).filter((stream) => stream.skipped).length,
  });
});

// List Songs based on their Likeliness of being skipped
app.get("/song/skippability", (req, res, next) => {
  let result: StreamingTimeGroup[] = [];
  getFilteredStreams(req).reduce(function (res, value) {
    if (value.master_metadata_track_name == null) return res;
    if (!res[value.master_metadata_track_name]) {
      res[value.master_metadata_track_name] = { name: value.master_metadata_track_name, streams: 0, skips: 0 };
      result.push(res[value.master_metadata_track_name]);
    }
    res[value.master_metadata_track_name].streams += 1;
    if (value.skipped) res[value.master_metadata_track_name].skips += 1;
    return res;
  }, {});

  res.json(result.filter((item) => item.streams >= 10).sort((firstItem, secondItem) => (1 / (firstItem.streams + firstItem.skips)) * firstItem.skips - (1 / (secondItem.streams + secondItem.skips)) * secondItem.skips));
});
