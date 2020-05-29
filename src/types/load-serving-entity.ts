/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

export enum ServiceType {
  ELECTRICITY = <any>"ELECTRICITY",
  GAS = <any>"GAS",
  SOLAR_PV = <any>"SOLAR_PV",
}

export enum OfferingType {
  BUNDLED = <any>"Bundled",
  DELIVERY = <any>"Delivery",
  ENERGY = <any>"Energy",
}

export enum Ownership {
  INVESTOR = <any>"INVESTOR",
  COOP = <any>"COOP",
  MUNI = <any>"MUNI",
  FEDERAL = <any>"FEDERAL",
  POLITICAL_SUBDIVISION = <any>"POLITICAL_SUBDIVISION",
  RETAIL_ENERGY_MARKETER = <any>"RETAIL_ENERGY_MARKETER",
  WHOLESALE_ENERGY_MARKETER = <any>"WHOLESALE_ENERGY_MARKETER",
  TRANSMISSION = <any>"TRANSMISSION",
  STATE = <any>"STATE",
  UNREGULATED = <any>"UNREGULATED",
};

export interface LoadServingEntity {
  lseId: number;
  name: string;
  code: string;
  websiteHome: string;
  offeringType: OfferingType;
  ownership: Ownership;
  serviceTypes: ServiceType[];
  totalRevenues: number;
  totalSales: number;
  totalCustomers: number;
  residentialServiceTypes: string;
  residentialRevenues: number;
  residentialSales: number;
  residentialCustomers: number;
  commercialServiceTypes: string;
  commercialRevenues: number;
  commercialSales: number;
  commercialCustomers: number;
  industrialServiceTypes: string;
  industrialRevenues: number;
  industrialSales: number;
  industrialCustomers: number;
  transportationServiceTypes: string;
  transportationRevenues: number;
  transportationSales: number;
  transportationCustomers: number;
  billingPeriodRepresentation?: BillingPeriodRepresentation[];
}

export interface BillingPeriodRepresentation {
  fromDateOffset: number;
  toDateOffset: number;
  style: string;
}

/**
 * User Defined Type Guard for LoadServingEntity
 */
export function isLoadServingEntity(arg: any): arg is LoadServingEntity {
  return arg.lseId !== undefined;
}
