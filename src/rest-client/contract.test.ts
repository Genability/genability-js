import { 
  isPaged,
  isQueryStringified,
  isSearchable
} from './contract';
import {
  BasePagedRequest,
  AddParamCallback
} from '../rest-client';


class GetNRequest extends BasePagedRequest {
  public someBoolean?: boolean;
  public someString?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('someBoolean', this.someBoolean);
    addParam('someString', this.someString);
  }
}

describe("Rest API Contracts", () => {
  describe("Paginated Requests", () => {
    it("isQueryStringified", async () => {
      const request: GetNRequest = new GetNRequest();
      expect(isQueryStringified(request)).toBeTruthy();
    })
    it("isPaged when a field set", async () => {
      const request: GetNRequest = new GetNRequest({
        pageCount: 10
      });
      expect(isPaged(request)).toBeTruthy();
    })
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


  describe("Searchable Requests", () => {
    it("isSearchable when search set", async () => {
      const request: GetNRequest = new GetNRequest({
        search: 'findme'
      });
      expect(isSearchable(request)).toBeTruthy();
    })
    it("handles search parameter", async () => {
      const request: GetNRequest = new GetNRequest();
      request.search = "findme";
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=findme');
    })
    it("handles searchOn pagination parameters", async () => {
      const request: GetNRequest = new GetNRequest();
      request.search = "findme";
      request.searchOn = ["fieldOne","fieldTwo","fieldThree"];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=findme&searchOn=fieldOne,fieldTwo,fieldThree');
    })
    it("handles pageStart pagination via constructor", async () => {
      const request: GetNRequest = new GetNRequest({
        search: "forthis",
        startsWith: true
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=forthis&startsWith=true');
    })
    it("handles pageStart pagination via constructor", async () => {
      const request: GetNRequest = new GetNRequest();
      request.search = "allem";
      request.endsWith = true;
      request.isRegex = false;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=allem&endsWith=true&isRegex=false');
    })
  })
});