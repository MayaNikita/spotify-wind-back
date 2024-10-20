import { FilterObject } from '../dto/filterObject';

export function formatFilterQueryString(filter: FilterObject): string {
  let str = '';
  if (filter.artist) str += `artist=${filter.artist}&`;
  if (filter.song) str += `song=${filter.song}&`;
  if (filter.dateFrom) str += `dateFrom=${filter.dateFrom}&`;
  if (filter.dateTo) str += `dateTo=${filter.dateTo}&`;
  return str;
}
