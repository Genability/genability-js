import { encode } from './utils';
import {
  CustomerClass,
  TariffType,
  ChargeType,
  ServiceType,
  Ownership,
} from '../types'

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Paged {
  pageStart?: number;
  pageCount?: number;
}

/**
 * To identify if the object is paged. Because Paged is made up of
 * optional parameters, this only returns true when one or both 
 * are populated (not just when properties are on the object).
 * @param object 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPaged(object: any): object is Paged {
  return 'pageStart' in object || 'pageCount' in object;
}

export interface Searchable {
  search?: string;
  searchOn?: string[];
  startsWith?: boolean;
  endsWith?: boolean;
  isRegex?: boolean;
  sortOn?: string[];
  sortOrder?: SortOrder[];
}

/**
 * To identify if the object is Searchable. Because Searchable is made up of
 * optional parameters, this only returns true when the search property 
 * is populated (not just when properties are on the object).
 * @param object 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSearchable(object: any): object is Searchable {
  return 'search' in object;
}

export function isSortable(object: Searchable): object is Searchable {
  return 'sortOn' in object && 'sortOrder' in object;
}

export interface QueryStringified {
  queryStringify(): string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isQueryStringified(object: any): object is QueryStringified {
  return 'queryStringify' in object;
}

export interface Response<T> extends Paged {
  status: string;
  type: string;
  count: number;
  results: Array<T>;
  requestId?: string;
}

export type AddParamCallback = (
  paramName: string, 
  paramValue?: string |
  string[] |
  number |
  boolean |
  CustomerClass[] |
  TariffType[] |
  ChargeType[] |
  ServiceType[] |
  Ownership[],
) => void;

export abstract class BasePagedRequest implements Paged, Searchable, QueryStringified {
  public pageStart?: number;
  public pageCount?: number;
  public search?: string;
  public searchOn?: string[];
  public startsWith?: boolean;
  public endsWith?: boolean;
  public isRegex?: boolean;
  public sortOn?: string[];
  public sortOrder?: SortOrder[];

  public constructor(init?: Partial<BasePagedRequest>) {
    Object.assign(this, init);
  }

  public queryStringify(): string {

    const parts: string[] = [];

    const callback: AddParamCallback = (
      paramName: string, 
      paramValue?: string |
      string[] |
      number |
      boolean |
      CustomerClass[] |
      TariffType[] |
      ChargeType[] |
      ServiceType[] |
      Ownership[],
    ): void => {
      if(paramValue === undefined) return;
      parts.push(paramName + '=' + encode(paramValue));
    };

    this.addParams(callback);
    this.addPaginationParams(callback);
    this.addSearchParams(callback);
    this.addSortParams(callback);

    return parts.join('&');
  }

  public abstract addParams(addParam: AddParamCallback): void;

  addPaginationParams(addParam: AddParamCallback): void {
    addParam('pageStart', this.pageStart);
    addParam('pageCount', this.pageCount);
  }

  addSearchParams(addParam: AddParamCallback): void {
    addParam('search', this.search);
    addParam('searchOn', this.searchOn);
    addParam('startsWith', this.startsWith);
    addParam('endsWith', this.endsWith);
    addParam('isRegex', this.isRegex);
  }

  addSortParams(addParam: AddParamCallback): void {
    addParam('sortOn', this.sortOn);
    addParam('sortOrder', this.sortOrder);
  }
}

export class PagedResponse<T> implements Response<T> {
  public status!: string;
  public type!: string;
  public count!: number;
  public results!: Array<T>;
  public requestId?: string;
  public pageStart?: number;
  public pageCount?: number;

  constructor({ status, type, count, results }: Response<T>) { 
    Object.assign(this, { status, type, count, results });
  }

}