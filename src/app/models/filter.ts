import {APIType} from './stackoverflow';

export class Filters {
  private filters = {
    'page': 1,
    'pagesize': 30,
    'fromdate': null,
    'todate': null,
    'order': 'desc',
    'min': null,
    'max': null,
    'sort': 'reputation',
    'inname': null,
    'site': '',
    'filter': '!9Z(-x-Q)8' // Special Filter (currently using it for Total Data Entries Returned)
  };

  constructor(type: APIType) { this.filters['site'] = type; }

  public addFiltersTo(url: string): string {
    return url + Object.getOwnPropertyNames(this.filters)
                      .filter( (title) => this.filters[title] !== null)
                      .map( (title) => title + '=' + this.filters[title])
                      .join('&');
  }

  public setValuesOf(fields: string[], values: any[]) {
      fields.forEach( (field, idx, _) => this.filters[field] = values[idx]);
  }
}
