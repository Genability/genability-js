import { 
  Document,
  DocumentSection,
  isDocument
} from './document';

describe('Document types', () => {
  it('works for Document', () => {
    const documentJson = '{\
      "documentId": 1,\
      "documentTitle": "E1 - Residential",\
      "sectionTypes": "RIDER,TARIFF",\
      "sourceUrl": "",\
      "sourceContentType": "application/pdf",\
      "lseId": 1,\
      "lseName": "Pacific Gas & Electric Co",\
      "sequenceNumber": 1\
      }';
    const document: Document = JSON.parse(documentJson);
    expect(document.documentId).toEqual(1);
    expect(document.documentTitle).toEqual('E1 - Residential');
    expect(document.sectionTypes).toEqual('RIDER,TARIFF');
    expect(document.sourceUrl).toEqual('');
    expect(document.sourceContentType).toEqual('application/pdf');
    expect(document.lseId).toEqual(1);
    expect(document.lseName).toEqual('Pacific Gas & Electric Co');
    expect(document.sequenceNumber).toEqual(1);
  })
  it('works for DocumentSection', () => {
    const documentSectionJson = '{\
      "documentSectionId": 15343,\
      "documentId": 11731,\
      "sectionHeading": "E1 - Residential",\
      "sectionType": "TARIFF",\
      "startPage": 1,\
      "customerClass": "RESIDENTIAL",\
      "revised": false\
      }';

    const documentSection: DocumentSection = JSON.parse(documentSectionJson);
    expect(documentSection.documentSectionId).toEqual(15343);
    expect(documentSection.documentId).toEqual(11731);
    expect(documentSection.sectionHeading).toEqual('E1 - Residential');
    expect(documentSection.sectionType).toEqual('TARIFF');
    expect(documentSection.startPage).toEqual(1);
    expect(documentSection.customerClass).toEqual('RESIDENTIAL');
    expect(documentSection.revised).toEqual(false);
  })
});
describe('isDocument', () => {
  it('works for isDocument', () => {
    const documentJson = '{\
      "documentId": 1,\
      "documentTitle": "E1 - Residential",\
      "sectionTypes": "RIDER,TARIFF",\
      "sourceUrl": "",\
      "sourceContentType": "application/pdf",\
      "lseId": 1,\
      "lseName": "Pacific Gas & Electric Co",\
      "sequenceNumber": 1\
      }';
    const document: Document = JSON.parse(documentJson);
    expect(isDocument(document)).toBeTruthy();
  });
});
