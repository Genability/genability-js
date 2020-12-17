import { 
  DocumentApi,
  GetDocumentsRequest,
  GetDocumentRequest
} from './document-api';
import { PagedResponse } from '../rest-client'
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

describe("Document api", () => {
  describe("get one endpoint", () => {
    it("returns the document", async () => {
      const documentId = 1;
      const document: Document = await restClient.getDocument(documentId);
      expect(document.documentId).toEqual(documentId);
    })
    it("returns the document with sections populated", async () => {
      const documentId = 1;
      const documentRequest: GetDocumentRequest = new GetDocumentRequest();
      documentRequest.populateDocumentSections = true;
      documentRequest.fields = Fields.EXTENDED;
      const document: Document = await restClient.getDocument(documentId, documentRequest);
      expect(document.documentId).toEqual(documentId);
      expect(document).toHaveProperty('sections');
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