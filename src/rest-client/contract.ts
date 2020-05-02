
export interface Paged {
  pageStart?: number;
  pageCount?: number;
}

export interface Response<T> extends Paged {
  status: string;
  type: string;
  count: number;
  results: Array<T>;
  requestId?: string;
}

export abstract class BasePagedRequest implements Paged {
  public pageStart = 0;
  public pageCount = 25;

  public constructor(init?: Partial<BasePagedRequest>) {
    Object.assign(this, init);
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