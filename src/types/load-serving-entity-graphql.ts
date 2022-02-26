import gql from 'graphql-tag';

export const lseGraphQLSchema = gql`
  enum ServiceType {
    ELECTRICITY,
    GAS,
    SOLAR_PV
  }

  enum OfferingType {
    BUNDLED,
    DELIVERY,
    ENERGY
  }

  enum Ownership {
    INVESTOR,
    COOP,
    MUNI,
    FEDERAL,
    POLITICAL_SUBDIVISION,
    RETAIL_ENERGY_MARKETER,
    WHOLESALE_ENERGY_MARKETER,
    TRANSMISSION,
    STATE,
    UNREGULATED
  }

  type LoadServingEntity {
    lseId: ID,
    name: String!,
    code: String!,
    websiteHome: String!,
    offeringType: OfferingType,
    ownership: Ownership,
    serviceTypes: [ServiceType],
    totalRevenues: Float,
    totalSales: Float,
    totalCustomers: Int,
    residentialServiceTypes: String,
    residentialRevenues: Float,
    residentialSales: Float,
    residentialCustomers: Int,
    commercialServiceTypes: String,
    commercialRevenues: Float,
    commercialSales: Float,
    commercialCustomers: Int,
    industrialServiceTypes: String,
    industrialRevenues: Float,
    industrialSales: Float,
    industrialCustomers: Int,
    transportationServiceTypes: String,
    transportationRevenues: Float,
    transportationSales: Float,
    transportationCustomers: Int,
    billingPeriodRepresentation: [BillingPeriodRepresentation],
  }

  type BillingPeriodRepresentation {
    fromDateOffset: Int,
    toDateOffset: Int,
    style: String
  }
`