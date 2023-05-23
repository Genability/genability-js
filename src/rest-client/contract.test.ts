import { 
  Fields,
  isPaged,
  isQueryStringified,
  isSearchable,
  isSortable,
  SortOrder,
  SingleResponse,
  PagedResponse,
  ResponseError,
  isResponseError
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

const successSingleResponse = {
  status: 'success',
  type: 'Integer',
  count: 1,
  results: [99]
}

const successPageResponse = {
  status: 'success',
  type: 'Integer',
  count: 3,
  results: [1,2,3],
  pageStart: 3,
  pageCount: 5
}

const errorsResponse = {
  status: 'error',
  type: 'Error',
  count: 2,
  results: [
    {
      code: 'ObjectNotFound',
      message: 'Object error object not found',
      objectName: 'TestObject'
    },
    {
      code: 'InvalidArgument',
      message: 'Field error field invalid argument',
      objectName: 'TestObject',
      propertyName: 'someProperty',
      propertyValue: 'xls'
    }
  ]
}

const serverErrorResponse = {
  status: 'error',
  type: 'Error',
  count: 1,
  results: [
    'A server error has occurred. Sorry. It has been logged and we will work to fix it.'
  ]
}

describe('PagedResponse constructor', () => {
  it('paged results not errors for successPageResponse', async () => {
    const response: PagedResponse<number> = new PagedResponse(successPageResponse);
    expect(response).toBeTruthy();
    expect(response.status).toEqual('success');
    expect(response.type).toEqual('Integer');
    expect(response.count).toEqual(3);
    expect(response.results).toHaveLength(3);
    expect(response.errors).toEqual(undefined);
    expect(response.pageStart).toEqual(3);
    expect(response.pageCount).toEqual(5);
    expect(isPaged(response)).toBeTruthy();
  })

  it('paged results not errors for empty results', async () => {
    const response: PagedResponse<number> = new PagedResponse({...successPageResponse, results: []});
    expect(response).toBeTruthy();
    expect(response.status).toEqual('success');
    expect(response.type).toEqual('Integer');
    expect(response.count).toEqual(3);
    expect(response.results).toHaveLength(0);
    expect(response.errors).toEqual(undefined);
    expect(response.pageStart).toEqual(3);
    expect(response.pageCount).toEqual(5);
    expect(isPaged(response)).toBeTruthy();
  })

  it('paged results not errors for successPageResponse', async () => {
    const response: PagedResponse<number> = new PagedResponse(successPageResponse);
    expect(response).toBeTruthy();
    expect(response.status).toEqual('success');
    expect(response.type).toEqual('Integer');
    expect(response.count).toEqual(3);
    expect(response.results).toHaveLength(3);
    expect(response.errors).toEqual(undefined);
    expect(response.pageStart).toEqual(3);
    expect(response.pageCount).toEqual(5);
    expect(isPaged(response)).toBeTruthy();
  })

  it('errors when payload are errors', async () => {
    const response: PagedResponse<ResponseError> = new PagedResponse(errorsResponse);
    expect(response).toBeTruthy();
    expect(response.status).toEqual('error');
    expect(response.type).toEqual('Error');
    expect(response.count).toEqual(2);
    expect(response.results).toHaveLength(0);
    expect(response.errors).toHaveLength(2);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('ObjectNotFound');
    expect(response.errors && response.errors[0].message).toEqual('Object error object not found');
    expect(response.errors && response.errors[0].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(response.errors && isResponseError(response.errors[1])).toEqual(true);
    expect(response.errors && response.errors[1].code).toEqual('InvalidArgument');
    expect(response.errors && response.errors[1].message).toEqual('Field error field invalid argument');
    expect(response.errors && response.errors[1].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[1].propertyName).toEqual('someProperty');
    expect(response.errors && response.errors[1].propertyValue).toEqual('xls');
    expect(isPaged(response)).toEqual(false);
  })

  it('errors when status is \'error\'', async () => {
    const response: PagedResponse<ResponseError> = new PagedResponse({...errorsResponse, type: 'Integer'});
    expect(response).toBeTruthy();
    expect(response.status).toEqual('error');
    expect(response.type).toEqual('Integer');
    expect(response.count).toEqual(2);
    expect(response.results).toHaveLength(0);
    expect(response.errors).toHaveLength(2);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('ObjectNotFound');
    expect(response.errors && response.errors[0].message).toEqual('Object error object not found');
    expect(response.errors && response.errors[0].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(response.errors && isResponseError(response.errors[1])).toEqual(true);
    expect(response.errors && response.errors[1].code).toEqual('InvalidArgument');
    expect(response.errors && response.errors[1].message).toEqual('Field error field invalid argument');
    expect(response.errors && response.errors[1].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[1].propertyName).toEqual('someProperty');
    expect(response.errors && response.errors[1].propertyValue).toEqual('xls');
    expect(isPaged(response)).toEqual(false);
  })

  it('errors when type is \'Error\'', async () => {
    const response: PagedResponse<ResponseError> = new PagedResponse({...errorsResponse, status: 'success'});
    expect(response).toBeTruthy();
    expect(response.status).toEqual('success');
    expect(response.type).toEqual('Error');
    expect(response.count).toEqual(2);
    expect(response.results).toHaveLength(0);
    expect(response.errors).toHaveLength(2);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('ObjectNotFound');
    expect(response.errors && response.errors[0].message).toEqual('Object error object not found');
    expect(response.errors && response.errors[0].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(response.errors && isResponseError(response.errors[1])).toEqual(true);
    expect(response.errors && response.errors[1].code).toEqual('InvalidArgument');
    expect(response.errors && response.errors[1].message).toEqual('Field error field invalid argument');
    expect(response.errors && response.errors[1].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[1].propertyName).toEqual('someProperty');
    expect(response.errors && response.errors[1].propertyValue).toEqual('xls');
    expect(isPaged(response)).toEqual(false);
  })

  it('errors when response is server error (500)', async () => {
    const response: PagedResponse<unknown> = new PagedResponse(serverErrorResponse);
    expect(response).toBeTruthy();
    expect(response.status).toEqual('error');
    expect(response.type).toEqual('Error');
    expect(response.count).toEqual(1);
    expect(response.results).toHaveLength(0);
    expect(response.errors).toHaveLength(1);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('SystemError');
    expect(response.errors && response.errors[0].message).toEqual('A server error has occurred. Sorry. It has been logged and we will work to fix it.');
    expect(response.errors && response.errors[0].objectName).toEqual('Error');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(isPaged(response)).toEqual(false);
  })
})

describe('SingleResponse constructor', () => {
  it('results not errors for successSingleResponse', async () => {
    const response: SingleResponse<number> = new SingleResponse(successSingleResponse);
    expect(response).toBeTruthy();
    expect(response.status).toEqual('success');
    expect(response.type).toEqual('Integer');
    expect(response.count).toEqual(1);
    expect(response.results).toHaveLength(1);
    expect(response.result).toEqual(99);
    expect(response.errors).toBeUndefined();
    expect(isPaged(response)).toEqual(false);
  })

  it('results not errors for success with empty results', async () => {
    const response: SingleResponse<number> = new SingleResponse({...successSingleResponse, results: []});
    expect(response).toBeTruthy();
    expect(response.status).toEqual('success');
    expect(response.type).toEqual('Integer');
    expect(response.count).toEqual(1);
    expect(response.results).toHaveLength(0);
    expect(response.result).toBeNull();
    expect(response.errors).toBeUndefined();
    expect(isPaged(response)).toEqual(false);
  })

  it('errors when payload are errors', async () => {
    const response: SingleResponse<ResponseError> = new SingleResponse(errorsResponse);
    expect(response).toBeTruthy();
    expect(response.status).toEqual('error');
    expect(response.type).toEqual('Error');
    expect(response.count).toEqual(2);
    expect(response.results).toHaveLength(0);
    expect(response.result).toBeNull();
    expect(response.errors).toHaveLength(2);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('ObjectNotFound');
    expect(response.errors && response.errors[0].message).toEqual('Object error object not found');
    expect(response.errors && response.errors[0].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(response.errors && isResponseError(response.errors[1])).toEqual(true);
    expect(response.errors && response.errors[1].code).toEqual('InvalidArgument');
    expect(response.errors && response.errors[1].message).toEqual('Field error field invalid argument');
    expect(response.errors && response.errors[1].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[1].propertyName).toEqual('someProperty');
    expect(response.errors && response.errors[1].propertyValue).toEqual('xls');
    expect(isPaged(response)).toEqual(false);
  })

  it('errors when status is \'error\'', async () => {
    const response: SingleResponse<ResponseError> = new SingleResponse({...errorsResponse, type: 'Integer'});
    expect(response).toBeTruthy();
    expect(response.status).toEqual('error');
    expect(response.type).toEqual('Integer');
    expect(response.count).toEqual(2);
    expect(response.results).toHaveLength(0);
    expect(response.result).toBeNull();
    expect(response.errors).toHaveLength(2);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('ObjectNotFound');
    expect(response.errors && response.errors[0].message).toEqual('Object error object not found');
    expect(response.errors && response.errors[0].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(response.errors && isResponseError(response.errors[1])).toEqual(true);
    expect(response.errors && response.errors[1].code).toEqual('InvalidArgument');
    expect(response.errors && response.errors[1].message).toEqual('Field error field invalid argument');
    expect(response.errors && response.errors[1].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[1].propertyName).toEqual('someProperty');
    expect(response.errors && response.errors[1].propertyValue).toEqual('xls');
    expect(isPaged(response)).toEqual(false);
  })

  it('errors when type is \'Error\'', async () => {
    const response: SingleResponse<ResponseError> = new SingleResponse({...errorsResponse, status: 'success'});
    expect(response).toBeTruthy();
    expect(response.status).toEqual('success');
    expect(response.type).toEqual('Error');
    expect(response.count).toEqual(2);
    expect(response.results).toHaveLength(0);
    expect(response.result).toBeNull();
    expect(response.errors).toHaveLength(2);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('ObjectNotFound');
    expect(response.errors && response.errors[0].message).toEqual('Object error object not found');
    expect(response.errors && response.errors[0].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(response.errors && isResponseError(response.errors[1])).toEqual(true);
    expect(response.errors && response.errors[1].code).toEqual('InvalidArgument');
    expect(response.errors && response.errors[1].message).toEqual('Field error field invalid argument');
    expect(response.errors && response.errors[1].objectName).toEqual('TestObject');
    expect(response.errors && response.errors[1].propertyName).toEqual('someProperty');
    expect(response.errors && response.errors[1].propertyValue).toEqual('xls');
    expect(isPaged(response)).toEqual(false);
  })

  it('errors when response is server error (500)', async () => {
    const response: SingleResponse<unknown> = new SingleResponse({ ...serverErrorResponse, type: 'String' });
    expect(response).toBeTruthy();
    expect(response.status).toEqual('error');
    expect(response.type).toEqual('String');
    expect(response.count).toEqual(1);
    expect(response.results).toHaveLength(0);
    expect(response.errors).toHaveLength(1);
    expect(response.errors && isResponseError(response.errors[0])).toEqual(true);
    expect(response.errors && response.errors[0].code).toEqual('SystemError');
    expect(response.errors && response.errors[0].message).toEqual('A server error has occurred. Sorry. It has been logged and we will work to fix it.');
    expect(response.errors && response.errors[0].objectName).toEqual('String');
    expect(response.errors && response.errors[0].propertyName).toBeUndefined();
    expect(response.errors && response.errors[0].propertyValue).toBeUndefined();
    expect(isPaged(response)).toEqual(false);
  })
})

describe('Rest API Contracts', () => {
  describe('GetNRequest constructor', () => {
    it('isQueryStringified', async () => {
      const request: GetNRequest = new GetNRequest();
      expect(isQueryStringified(request)).toBeTruthy();
    })
    it('isPaged when a field set', async () => {
      const request: GetNRequest = new GetNRequest({
        pageCount: 10
      });
      expect(isPaged(request)).toBeTruthy();
    })
    it('handles no pagination parameters', async () => {
      const request: GetNRequest = new GetNRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles empty constructor', async () => {
      const request: GetNRequest = new GetNRequest({});
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles pageCount pagination parameter', async () => {
      const request: GetNRequest = new GetNRequest();
      request.pageCount = 44;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageCount=44');
    })
    it('handles both pagination parameters', async () => {
      const request: GetNRequest = new GetNRequest();
      request.pageCount = 44;
      request.pageStart = 77;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageStart=77&pageCount=44');
    })
    it('handles pageStart pagination via constructor', async () => {
      const request: GetNRequest = new GetNRequest({
        pageStart: 66
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageStart=66');
    })
    it('handles both pagination via constructor', async () => {
      const request: GetNRequest = new GetNRequest({
        pageCount: 22,
        pageStart: 33
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('pageStart=33&pageCount=22');
    })
  })

  describe('Searchable Requests', () => {
    it('isSearchable when search set', async () => {
      const request: GetNRequest = new GetNRequest({
        search: 'findme'
      });
      expect(isSearchable(request)).toBeTruthy();
    })
    it('handles search parameter', async () => {
      const request: GetNRequest = new GetNRequest();
      request.search = 'findme';
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=findme');
    })
    it('handles searchOn pagination parameters', async () => {
      const request: GetNRequest = new GetNRequest();
      request.search = 'findme';
      request.searchOn = ['fieldOne','fieldTwo','fieldThree'];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=findme&searchOn=fieldOne,fieldTwo,fieldThree');
    })
    it('handles pageStart pagination via constructor', async () => {
      const request: GetNRequest = new GetNRequest({
        search: 'forthis',
        startsWith: true
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=forthis&startsWith=true');
    })
    it('handles pageStart pagination via constructor', async () => {
      const request: GetNRequest = new GetNRequest();
      request.search = 'allem';
      request.endsWith = true;
      request.isRegex = false;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('search=allem&endsWith=true&isRegex=false');
    })
  })

  describe('Sortable Requests', () => {
    it('isSortable false when only sortOn set', async () => {
      const request: GetNRequest = new GetNRequest({
        sortOn: ['name'],
      });
      expect(isSortable(request)).toBeFalsy();
    })
    it('isSortable false when only sortOrder set', async () => {
      const request: GetNRequest = new GetNRequest({
        sortOrder: [SortOrder.DESC],
      });
      expect(isSortable(request)).toBeFalsy();
    })
    it('isSortable true when sortOn and sortOrder set', async () => {
      const request: GetNRequest = new GetNRequest({
        sortOn: ['name'],
        sortOrder: [SortOrder.ASC]
      });
      expect(isSortable(request)).toBeTruthy();
    })
    it('handles sort parameter', async () => {
      const request: GetNRequest = new GetNRequest();
      request.sortOn = ['name', 'date'];
      request.sortOrder = [SortOrder.ASC, SortOrder.DESC];
      const qs: string = request.queryStringify();
      expect(qs).toEqual('sortOn=name,date&sortOrder=ASC,DESC');
    })
    it('handles sort via constructor', async () => {
      const request: GetNRequest = new GetNRequest({
        sortOn: ['name', 'date'],
        sortOrder: [SortOrder.ASC, SortOrder.DESC]
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('sortOn=name,date&sortOrder=ASC,DESC');
    })
  })

  describe('Fieldsable Requests', () => {
    it('should not set fields parameter if undefined', async () => {
      const request: GetNRequest = new GetNRequest();
      request.fields = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it('handles fields parameter', async () => {
      const request: GetNRequest = new GetNRequest();
      request.fields = Fields.MINIMUM;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('fields=min');
    })
    it('handles fields via constructor', async () => {
      const request: GetNRequest = new GetNRequest({
        fields: Fields.EXTENDED,
      });
      const qs: string = request.queryStringify();
      expect(qs).toEqual('fields=ext');
    })
  })
});

describe('isResponseError function', () => {
  it('should be false for invalid JSON', () => {
    const responseError: ResponseError = JSON.parse(
      '{\
        "code": "1",\
        "message": "error"\
      }'
    );
    expect(isResponseError(responseError)).toEqual(false);
  })
  it('should be true for valid JSON', () => {
    const responseError: ResponseError = JSON.parse(
      '{\
        "code": "InvalidFileFormat",\
        "message": "Invalid file format",\
        "objectName": "TestObject"\
      }'
    );
    expect(isResponseError(responseError)).toEqual(true);
  })
});