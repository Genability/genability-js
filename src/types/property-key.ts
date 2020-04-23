/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

export enum PrivacyFlag {
  PUBLIC = <any>"PUBLIC",
  UNLISTED = <any>"UNLISTED",
  PRIVATE = <any>"PRIVATE",
}

export enum DataType {
  STRING = <any>"STRING",
  CHOICE = <any>"CHOICE",
  BOOLEAN = <any>"BOOLEAN",
  DATE = <any>"DATE",
  DECIMAL = <any>"DECIMAL",
  INTEGER = <any>"INTEGER",
  FORMULA = <any>"FORMULA",
  LOOKUP = <any>"LOOKUP",
  DEMAND = <any>"DEMAND"
};

export interface GenPropertyKey {
  keyName: string;
  displayName: string;
  family: string;
  keyspace: string;
  description: string;
  dataType: DataType;
  quantityUnit?: string;
  formulaDetail?: string;
  lookbackPeriod?: string;
  entityId?: number;
  entityType?: string;
  privacy?: PrivacyFlag;
  choices?: GenPropertyChoice[];
}

export interface GenPropertyChoice {
  displayValue: number;
  dataValue: string;
  likelihood?: number;
}

/**
 * User Defined Type Guard for GenPropertyKey
 */
export function isGenPropertyKey(arg: any): arg is GenPropertyKey {
  return arg.keyName !== undefined;
}
