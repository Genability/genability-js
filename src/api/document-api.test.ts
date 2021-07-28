import { 
  DocumentApi,
  GetDocumentsRequest,
  GetDocumentRequest
} from './document-api';
import { SingleResponse, PagedResponse } from '../rest-client'
import {
  Document,
  isDocument
} from '../types/document';
import { ResourceTypes } from "../types/resource-types";
import { credentialsFromFile } from '../rest-client/credentials';
import { Fields } from '../rest-client/contract';

const credentials = credentialsFromFile('unitTest');
const restClient = new DocumentApi(credentials);

describe("GetDocuments request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetDocumentsRequest = new GetDocumentsRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles lseId parameter", async () => {
      const request: GetDocumentsRequest = new GetDocumentsRequest();
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1');
    })
    it("handles undefined parameters", async () => {
      const request: GetDocumentsRequest = new GetDocumentsRequest();
      request.lseId = undefined;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles both pagination", async () => {
      const request: GetDocumentsRequest = new GetDocumentsRequest();
      request.lseId = 1;
      request.pageCount = 22;
      request.pageStart = 33;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&pageStart=33&pageCount=22');
    })
    it("handles both pagination via constructor", async () => {
      const request: GetDocumentsRequest = new GetDocumentsRequest({
        pageCount: 22,
        pageStart: 33
      });
      request.lseId = 1;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('lseId=1&pageStart=33&pageCount=22');
    })
  })
});

describe("GetDocument request", () => {
  describe("call to queryStringify", () => {
    it("handles no parameters", async () => {
      const request: GetDocumentRequest = new GetDocumentRequest();
      const qs: string = request.queryStringify();
      expect(qs).toEqual('');
    })
    it("handles populateDocumentSections parameter", async () => {
      const request: GetDocumentRequest = new GetDocumentRequest();
      request.populateDocumentSections = true;
      const qs: string = request.queryStringify();
      expect(qs).toEqual('populateDocumentSections=true');
    })
    it("handles searchKey parameter for value documentId", async () => {
      const request: GetDocumentRequest = new GetDocumentRequest();
      request.searchKey = "documentId";
      const qs: string = request.queryStringify();
      expect(qs).toEqual('searchKey=documentId');
    })
    it("handles searchKey parameter for value documentSectionId", async () => {
      const request: GetDocumentRequest = new GetDocumentRequest();
      request.searchKey = "documentSectionId";
      const qs: string = request.queryStringify();
      expect(qs).toEqual('searchKey=documentSectionId');
    })
    it("handles searchKey parameter for value priorDocumentId", async () => {
      const request: GetDocumentRequest = new GetDocumentRequest();
      request.searchKey = "priorDocumentId";
      const qs: string = request.queryStringify();
      expect(qs).toEqual('searchKey=priorDocumentId');
    })
    it("handles mutiple parameters", async () => {
      const request: GetDocumentRequest = new GetDocumentRequest();
      request.populateDocumentSections = true;
      request.searchKey = "documentId";
      const qs: string = request.queryStringify();
      expect(qs).toEqual('populateDocumentSections=true&searchKey=documentId');
    })
  })
});

describe("Document api", () => {
  describe("get one endpoint", () => {
    it("returns the document", async () => {
      const documentId = 1;
      const response: SingleResponse<Document> = await restClient.getDocument(documentId);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      expect(response.result && response.result.documentId).toEqual(documentId);
    })
    it("returns the document with sections populated", async () => {
      const documentId = 1;
      const documentRequest: GetDocumentRequest = new GetDocumentRequest();
      documentRequest.populateDocumentSections = true;
      documentRequest.fields = Fields.EXTENDED;
      const response: SingleResponse<Document> = await restClient.getDocument(documentId, documentRequest);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      expect(response.result && response.result.documentId).toEqual(documentId);
      expect(response.result && response.result).toHaveProperty('sections');
    })
    it("returns the document with searchKey is documentSectionId", async () => {
      const searchId = 1;
      const documentRequest: GetDocumentRequest = new GetDocumentRequest();
      documentRequest.searchKey = "documentSectionId";
      documentRequest.fields = Fields.EXTENDED;
      const response: SingleResponse<Document>  = await restClient.getDocument(searchId, documentRequest);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      expect(response.result && response.result.documentId).toEqual(409);
    })
    it("returns the document with searchKey is priorDocumentId", async () => {
      const searchId = 5105;
      const documentRequest: GetDocumentRequest = new GetDocumentRequest();
      documentRequest.searchKey = "priorDocumentId";
      documentRequest.fields = Fields.EXTENDED;
      const response: SingleResponse<Document>  = await restClient.getDocument(searchId, documentRequest);
      expect(response.result).toBeTruthy();
      expect(response.errors).toBeUndefined();
      expect(response.result && response.result.documentId).toEqual(7621);
    })
  })
  describe("get n endpoint", () => {
    it("returns a list of documents", async () => {
      const request: GetDocumentsRequest = new GetDocumentsRequest();
      const response: PagedResponse<Document> = await restClient.getDocuments(request);
      expect(response.status).toEqual("success");
      expect(response.type).toEqual(ResourceTypes.DOCUMENT);
      for(const document of response.results) {
        expect(isDocument(document)).toBeTruthy();
      }
    }, 40000)
  })
});