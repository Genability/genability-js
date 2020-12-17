import {
  RestApiClient,
  RestApiCredentials,
  AddParamCallback,
  GenabilityConfig,
  BasePagedRequest,
  PagedResponse
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

  addParams(addParam: AddParamCallback): void {
    addParam('populateDocumentSections', this.populateDocumentSections);
  }
}

export class DocumentApi extends RestApiClient {
  public constructor(credentials: RestApiCredentials) {
    const Config = GenabilityConfig.config();
    super(Config.baseURL, credentials);
  }

  public async getDocuments(request: GetDocumentsRequest): Promise<PagedResponse<Document>> {
    const response = await this.axiosInstance.get(`/v1/documents`, { params: request } );
    return new PagedResponse(response.data);
  }

  public async getDocument(documentId: number, request?: GetDocumentRequest): Promise<Document> {
    const response = await this.axiosInstance.get(`/v1/documents/${documentId}`, { params: request } );
    return response.data.results[0];
  }
}
