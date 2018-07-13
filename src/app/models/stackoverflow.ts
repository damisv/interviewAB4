import {User} from './user';
import {Filters} from './filter';

export interface StackOverflowAPI {
  items: User[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  total: number;
}

export interface API {
  getDataFor(filters: Filters);
}

export enum APIType {
  stackoverflow = 'stackoverflow',
  mathematics = 'mathematics'
}
