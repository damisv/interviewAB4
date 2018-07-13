import {Component, OnInit, ViewChild} from '@angular/core';
import {APIType, Filters, User} from '../../models';
import {StackExchangeService} from '../../services';
import {Router} from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';

import {BehaviorSubject, merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, debounceTime, filter} from 'rxjs/operators';
import {MyDataSource} from '../../utils/customDataTable';

/**
 * @title Retrieves stackoverflow users based on filters used
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // MARK: ViewChild
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // MARK: Properties
  displayedColumns = ['profile', 'name', 'reputation', 'location', 'goldBadges', 'silverBadges', 'bronzeBadges'];
  dataSource: MyDataSource<User> | null;

  $nameFilter = new BehaviorSubject<string>(null);

  // MARK: Initialization
  constructor(private stackService: StackExchangeService,
              private router: Router) {}

  ngOnInit() {
    this.dataSource = new MyDataSource<User>(this.stackService, this.paginator,
                                          this.sort, APIType.stackoverflow);
    this.$nameFilter.asObservable()
      .pipe(
        debounceTime(400),
        filter( name => name && name !== undefined && name !== ' ')
      ).subscribe( name => this.dataSource.filters.setValuesOf(['name'], [name]));
  }

  // MARK: Public methods
  public showUser(id: number) { this.router.navigate(['details', id]); }
}


