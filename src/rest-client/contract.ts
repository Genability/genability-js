import { encode } from './utils';

export enum Fields {
  MINIMUM = 'min',
  EXTENDED = 'ext'
}

export interface Fieldsable {
  fields?: Fields;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Paged {
  pageStart?: number;
  pageCount?: number;
}

/**
 * User defined type guard to identify if the object is paged. Because Paged 
 * is made up of optional parameters, this only returns true when one or both 
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
}

export interface Sortable {
  sortOn?: string[];
  sortOrder?: SortOrder[];
}

/**
 * User defined type guard to identify if the object is Searchable. Because Searchable 
 * is made up of optional parameters, this only returns true when the search property 
 * is populated (not just when properties are on the object).
 * @param object 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSearchable(object: any): object is Searchable {
  return 'search' in object;
}

/**
 * * User defined type guard to identify if the object is Sortable.
 */
export function isSortable(object: Sortable): object is Sortable {
  return 'sortOn' in object && 'sortOrder' in object;
}

export interface QueryStringified {
  queryStringify(): string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isQueryStringified(object: any): object is QueryStringified {
  return 'queryStringify' in object;
}

export interface ResponseError {
  code: string;
  message: string;
  objectName: string;
  propertyName?: string;
  propertyValue?: string;
}

/**
 * User defined type guard to identify if the object is ResponseError.
 */
export function isResponseError(arg: ResponseError): arg is ResponseError {
  return arg.code !== undefined &&
    arg.message !== undefined &&
    arg.objectName !== undefined
}

export interface Response<T> {
  status: string;
  type: string;
  count: number;
  results: Array<T>;
  requestId?: string;
  errors?: Array<ResponseError>;
}

/**
 * User defined type guard to identify if the object is ResponseError.
 */
export function isResponse(arg: Response<unknown>): arg is Response<unknown>  {
  return arg.status !== undefined &&
   arg.type !== undefined &&
   arg.count !== undefined &&
   arg.results !== undefined;
}

export type AddParamCallback = (
  paramName: string, 
  paramValue?: string |
  string[] |
  number |
  boolean,
) => void;

export abstract class BasePagedRequest implements Paged, Searchable, Sortable, Fieldsable, QueryStringified {
  public pageStart?: number;
  public pageCount?: number;
  public search?: string;
  public searchOn?: string[];
  public startsWith?: boolean;
  public endsWith?: boolean;
  public isRegex?: boolean;
  public sortOn?: string[];
  public sortOrder?: SortOrder[];
  public fields?: Fields;

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
      boolean,
    ): void => {
      if(paramValue === undefined) return;
      parts.push(paramName + '=' + encode(paramValue));
    };

    this.addParams(callback);
    this.addPaginationParams(callback);
    this.addSearchParams(callback);
    this.addSortParams(callback);
    this.addFieldsParam(callback);

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

  addFieldsParam(addParam: AddParamCallback): void {
    if(this.fields !== undefined && (this.fields === Fields.MINIMUM || this.fields === Fields.EXTENDED)) {
      addParam('fields', this.fields);
    }
  }
}

abstract class BaseResponse<T>implements Response<T> {
  public status!: string;
  public type!: string;
  public count!: number;
  public results!: Array<T>;
  public requestId?: string;
  public errors?: Array<ResponseError>;

  constructor(arg: Response<T>) { 
    Object.assign(this, arg);
    if (arg.status === 'error' || arg.type === 'Error') {
      const results: Array<T> = [];
      const errors: Array<ResponseError> = (this.errors ? this.errors : []);
      arg.results.forEach((result) => {
        if (isResponseError(result as unknown as ResponseError)) {
          errors.push(result as unknown as ResponseError)
        } else if (typeof result === `string`) {
          errors.push({
            code: 'SystemError',
            message: result,
            objectName: arg.type,
          })
        } else {
          results.push(result);
        }
      });
      if(errors.length > 0) {
        this.errors = errors;
        this.results = results;
      }
    }
  }
}

export class DefaultPagedRequest extends BasePagedRequest {
  addParams(addParam: AddParamCallback): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    // no-op, we only want the default pagination, search & sort params
  }
}

export class SingleResponse<T> extends BaseResponse<T> implements Response<T> {
  get result(): T | null {
    if(this.errors && this.errors?.length > 0) {
      return null;
    }
    if(this.results === undefined || this.results.length == 0) {
      return null;
    }
    return this.results[0];
  }
}

export class PagedResponse<T> extends BaseResponse<T> implements Response<T>, Paged {
  public pageStart?: number;
  public pageCount?: number;
}
