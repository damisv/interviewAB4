import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Filters, StackOverflowAPI, API} from '../models/';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StackExchangeService implements API {
  // MARK: Static Properties
  private static base = 'https://api.stackexchange.com/2.2/users';

  // MARK: Initialization
  constructor(private http: HttpClient) {}

  // MARK: Public methods
  public getUsers(filters: Filters) {
    return this.http.get<StackOverflowAPI>(filters.addFiltersTo(`${StackExchangeService.base}?` ));
  }
  public getUser(filters: Filters, id: string) {
    return this.http.get<StackOverflowAPI>(filters.addFiltersTo(`${StackExchangeService.base}\/${id}?`))
      .pipe( map(res => res.items[0]));
  }

  // MARK: Interface methods
  /*
   *  This method is needed because of the Table Data source that is used
   *  @param filters - The Filters object (see Filters class)
   */
  public getDataFor(filters: Filters): Observable<StackOverflowAPI> { return this.getUsers(filters); }
}
