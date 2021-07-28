import { UsageType } from './territory';
import { CustomerClass } from './tariff';


export interface Document {
  documentId: number;
  documentTitle: string;
  sectionTypes?: string;
  archiveUrl?: string;
  sourceUrl: string;
  sourceContentType: string;
  lseId: number;
  lseName: string;
  territoryId?: number;
  territoryName?: string;
  sequenceNumber: number;
  sections?: DocumentSection[];
}

export interface DocumentSection {
  documentSectionId: number;
  documentId: number;
  sectionHeading: string;
  sectionType: UsageType;
  startPage: number;
  customerClass: CustomerClass;
  revised: boolean;
}

/**
 * User Defined Type Guard for Document
 */
export function isDocument(arg: Document): arg is Document {
  return arg.documentId !== undefined &&
    arg.documentTitle !== undefined &&
    arg.sourceUrl !== undefined &&
    arg.sourceContentType !== undefined &&
    arg.lseId !== undefined &&
    arg.lseName !== undefined &&
    arg.sequenceNumber !== undefined
}
