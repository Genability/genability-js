import {
  RestApiClient,
  AddParamCallback,
  BasePagedRequest,
  PagedResponse,
  SingleResponse
} from '../rest-client';
import {
  Document,
} from '../types';

export class GetDocumentsRequest extends BasePagedRequest {
  public lseId?: number;

  addParams(addParam: AddParamCallback): void {
    addParam('lseId', this.lseId);
  }
}

export class GetDocumentRequest extends BasePagedRequest {
  public populateDocumentSections?: boolean;
  public searchKey?: string;

  addParams(addParam: AddParamCallback): void {
    addParam('populateDocumentSections', this.populateDocumentSections);
    addParam('searchKey', this.searchKey);
  }
}

export class DocumentApi extends RestApiClient {

  public async getDocuments(request: GetDocumentsRequest): Promise<PagedResponse<Document>> {
    return this.getPaged('/v1/documents', { params: request } );
  }

  public async getDocument(documentId: number, request?: GetDocumentRequest): Promise<SingleResponse<Document>> {
    return this.getSingle(`/v1/documents/${documentId}`, { params: request } );
  }
}
