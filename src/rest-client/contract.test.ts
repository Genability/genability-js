import { 
  Paged,
  isPaged,
  QueryStringified,
  isQueryStringified
} from './contract';
import {
  RestApiClient,
  RestApiCredentials,
  PagedResponse,
  BasePagedRequest,
  AddParamCallback
} from '../rest-client';


class GetNRequest extends BasePagedRequest {
  public excludeGlobal?: boolean;
  public keySpace?: string;
  public family?: string;
  public entityId?: number;
  public entityType?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('excludeGlobal', this.excludeGlobal);
    addParam('keySpace', this.keySpace);
    addParam('family', this.family);
    addParam('entityId', this.entityId);
    addParam('entityType', this.entityType);
  }
}

describe("Rest API Contracts", () => {
  describe("Paginated Requests", () => {
    it("handles no pagination parameters", async () => {
      const request: GetNRequest = new GetNRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles empty constructor", async () => {
      const request: GetNRequest = new GetNRequest({});
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles pageCount pagination parameter", async () => {
      const request: GetNRequest = new GetNRequest();
      request.pageCount = 44;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageCount=44');
    })
    it("handles both pagination parameters", async () => {
      const request: GetNRequest = new GetNRequest();
      request.pageCount = 44;
      request.pageStart = 77;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageStart=77&pageCount=44');
    })
    it("handles pageStart pagination via constructor", async () => {
      const request: GetNRequest = new GetNRequest({
        pageStart: 66
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageStart=66');
    })
    it("handles both pagination via constructor", async () => {
      const request: GetNRequest = new GetNRequest({
        pageCount: 22,
        pageStart: 33
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageStart=33&pageCount=22');
    })
  })
});