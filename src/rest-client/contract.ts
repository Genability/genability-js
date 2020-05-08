import { encode } from './utils';

export interface Paged {
  pageStart?: number;
  pageCount?: number;
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
  paramValue?: string | number | boolean,
) => void;

export abstract class BasePagedRequest implements Paged, QueryStringified {
  public pageStart = 0;
  public pageCount = 25;

  public constructor(init?: Partial<BasePagedRequest>) {
    Object.assign(this, init);
  }

  public queryStringify(): string {

    const parts: string[] = [];

    const callback: AddParamCallback = (
      paramName: string, 
      paramValue?: string | number | boolean,
    ): void => {
      if(paramValue === undefined) return;
      parts.push(paramName + '=' + encode(paramValue));
    };

    this.addParams(callback);

    return parts.join('&');
  }

  public abstract addParams(addParam: AddParamCallback): void;
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