export enum ServiceType {
  ELECTRICITY = "ELECTRICITY",
  GAS = "GAS",
  SOLAR_PV = "SOLAR_PV",
}

export enum OfferingType {
  BUNDLED = "Bundled",
  DELIVERY = "Delivery",
  ENERGY = "Energy",
}

export enum Ownership {
  INVESTOR = "INVESTOR",
  COOP = "COOP",
  MUNI = "MUNI",
  FEDERAL = "FEDERAL",
  POLITICAL_SUBDIVISION = "POLITICAL_SUBDIVISION",
  RETAIL_ENERGY_MARKETER = "RETAIL_ENERGY_MARKETER",
  WHOLESALE_ENERGY_MARKETER = "WHOLESALE_ENERGY_MARKETER",
  TRANSMISSION = "TRANSMISSION",
  STATE = "STATE",
  UNREGULATED = "UNREGULATED",
};

export interface LoadServingEntity {
  lseId: number;
  name: string;
  code: string;
  websiteHome: string;
  offeringType?: OfferingType;
  ownership?: Ownership;
  serviceTypes?: ServiceType[];
  totalRevenues?: number;
  totalSales?: number;
  totalCustomers?: number;
  residentialServiceTypes?: string;
  residentialRevenues?: number;
  residentialSales?: number;
  residentialCustomers?: number;
  commercialServiceTypes?: string;
  commercialRevenues?: number;
  commercialSales?: number;
  commercialCustomers?: number;
  industrialServiceTypes?: string;
  industrialRevenues?: number;
  industrialSales?: number;
  industrialCustomers?: number;
  transportationServiceTypes?: string;
  transportationRevenues?: number;
  transportationSales?: number;
  transportationCustomers?: number;
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
export function isLoadServingEntity(arg: LoadServingEntity): arg is LoadServingEntity {
  return arg.lseId !== undefined;
}
