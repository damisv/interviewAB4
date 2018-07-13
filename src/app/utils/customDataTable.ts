import {DataSource} from '@angular/cdk/table';
import {MatPaginator, MatSort} from '@angular/material';
import {Filters, API, APIType} from '../models';

import {BehaviorSubject, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

export class MyDataSource<T> extends DataSource<T> {
  // MARK: Properties
  data: T[];

  private _filtersChanged: BehaviorSubject<Filters>;
  private _loadingResult = new BehaviorSubject<boolean>(false);
  private _rateLimitReached = new BehaviorSubject<boolean>(false);

  // MARK: Setters and getters
  get loadingResult(): boolean { return this._loadingResult.value; }
  set loadingResult(state: boolean) { this._loadingResult.next(state); }

  get rateLimitReached(): boolean { return this._rateLimitReached.value; }
  set rateLimitReached(state: boolean) { this._rateLimitReached.next(state); }

  get filters(): Filters { return this._filtersChanged.value; }
  set filters(filters: Filters) { this._filtersChanged.next(filters); }

  constructor(private service: API,
              private _paginator: MatPaginator,
              private sort: MatSort,
              private type: APIType) {
    super();
    this._filtersChanged = new BehaviorSubject<Filters>(new Filters(type));
    _paginator.pageIndex = 0;
    this.sort.sortChange.subscribe(() => {
      this._paginator.pageIndex = 0;
      this.filters.setValuesOf(['sort', 'order'], [this.sort.active, this.sort.direction]);
    });
  }

  connect(): Observable<T[]> {
    const eventEmitters = [this.sort.sortChange, this._paginator.page, this._filtersChanged];
    return merge(...eventEmitters)
          .pipe(
            startWith({}),
            switchMap( () => {
              this.loadingResult = true;
              this.rateLimitReached = false;
              const tempPageSize = this._paginator.pageSize !== undefined ? this._paginator.pageSize : 30;
              this.filters.setValuesOf(['page', 'pagesize'], [this._paginator.pageIndex + 1, tempPageSize]);
              return this.service.getDataFor(this.filters);
            }),
            map( data => {
              this.loadingResult = false;
              this._paginator.length = data['total'];
              return data['items'];
            }),
            catchError(() => {
              this.loadingResult = false;
              this.rateLimitReached = true;
              return observableOf([]);
            })
            );
  }

  disconnect() {}
}
