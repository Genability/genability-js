import gql from 'graphql-tag';

export const tariffGraphQLSchema = gql`
  enum TariffType {
    DEFAULT,  
    ALTERNATIVE,
    RIDER,
    OPTIONAL_EXTRA,
    INCENTIVE,
    PROPOSED
  }

  enum CustomerClass {
    GENERAL,
    RESIDENTIAL,
    SPECIAL_USE,
    PROPOSED
  }

  enum ChargeType {
    FIXED_PRICE,
    CONSUMPTION_BASED,
    DEMAND_BASED,
    QUANTITY,
    MINIMUM,
    MAXIMUM,
    TAX,
    NET_EXCESS_GENERATION
  }

  enum ChargeClass {
    SUPPL,
    TRANSMISSION,
    DISTRIBUTION,
    TAX,
    CONTRACTED,
    USER_ADJUSTED,
    AFTER_TAX,
    OTHER,
    NON_BYPASSABLE
  }

  enum ChargePeriod {
    ONE_TIME,
    HOURLY
    DAILY,
    MONTHLY,
    QUARTERLY,
    ANNUALLY
  }

  enum TransactionType {
    BUY,
    SELL,
    NET,
    BUY_IMPORT,
    SELL_EXPORT 
  }

  enum TariffPropertyType {
    APPLICABILITY,
    RATE_CRITERIA,
    BENEFIT,
    DATA_REPUTATION,
    SERVICE_TERMS,
    INFO
  }

  enum TimeOfUseType {
    ON_PEAK,
    PARTIAL_PEAK,
    OFF_PEAK,
    CRITICAL_PEAK,
    SUPER_OFF_PEAK,
    SUPER_ON_PEAK
  }

  enum RateUnit {
    COST_PER_UNIT,
    PERCENTAGE,
    BLOCK,
    BLOCK_SELL_BACK
  }

  enum ProrationRule {
    SPLIT_DEMAND_VERSION_CHANGE,
    SINGLE_DEMAND_SEASON_CHANGE
  }

  enum PropertyDataType {
    STRING,
    CHOICE,
    BOOLEAN,
    DATE,
    DECIMAL,
    INTEGER,
    FORMULA,
    LOOKUP,
    DEMAND
  }

  enum PrivacyFlag {
    PUBLIC,
    UNLISTED,
    PRIVATE,
  }

  type TariffDocument {
    tariffId: ID!
    documentId: ID!
    documentSectionId: ID!
    document: Document!
  }

  type Tariff {
    tariffId: ID!
    masterTariffId: ID!
    tariffCode: String!
    tariffBookName: String
    privacy: PrivacyFlag
    tariffName: String!
    lseId: ID!
    lseName: String!
    lseCode: String
    serviceType: ServiceType
    priorTariffId: ID
    distributionLseId: ID
    tariffType: TariffType
    customerClass: CustomerClass
    customerCount: Int
    customerLikelihood: Float
    customerCountSource: String
    territoryId: ID
    effectiveDate: String
    endDate: String
    closedDate: String
    isActive: Boolean
    timeZone: String
    billingPeriod: ChargePeriod
    currency: String
    chargeTypes: [ChargeType]
    chargePeriod: [ChargePeriod]
    minMonthlyConsumption: Float
    maxMonthlyConsumption: Float
    minMonthlyDemand: Float
    maxMonthlyDemand: Float
    hasTimeOfUseRates: Boolean
    hasTieredRates: Boolean
    hasContractedRates: Boolean
    hasTariffApplicability: Boolean
    hasRateApplicability: Boolean
    hasNetMetering: Boolean
    properties: [TariffProperty]
    rates: [TariffRate]
    documents: [TariffDocument]
  }

  type TariffRate {
    tariffRateId: ID!
    masterTariffRateId: ID
    tariffId: ID
    riderTariffId: ID
    riderId: ID!
    tariffSequenceNumber: Int
    rateGroupName: String!
    rateName: String!
    fromDateTime: String
    toDateTime: String
    chargeType: ChargeType
    chargeClass: [ChargeClass]
    chargePeriod: ChargePeriod
    transactionType: TransactionType
    quantityKey: String
    applicabilityKey: String
    variableLimitKey: String
    variableRateKey: String
    variableFactorKey: String
    edgePredominance: PredominanceRule
    territory: Territory
    season: Season
    timeOfUse: TimeOfUse
    rateBands: [TariffRateBand]
    prorationRules: [ProrationRule]
  }

  type TariffRateBand {
    tariffRateBandId: ID
    tariffRateId: ID
    rateSequenceNumber: Int
    hasConsumptionLimit: Boolean
    consumptionUpperLimit: Float
    hasDemandLimit: Boolean
    demandUpperLimit: Float
    hasPropertyLimit: Boolean
    propertyUpperLimit: Float
    applicabilityValue: String
    calculationFactor: Float
    rateAmount: Float
    rateUnit: RateUnit
    isCredit: Boolean
  }

  type GenPropertyChoice {
    displayValue: String!
    dataValue: String!
    likelihood: Float
  }

  type TariffProperty {
    keyName: String!
    subKeyname: String
    displayName: String!
    family: String!
    keyspace: String!
    description: String!
    dataType: PropertyDataType
    quantityUnit: String
    formulaDetail: String
    lookbackIntervalQuantity: Int
    lookbackQuantity: Int
    lookbackPeriod: String
    lookbackTimeOfUseId: ID
    lookbackSeasonId: ID
    entityId: ID
    entityType: String
    privacy: PrivacyFlag
    choices: [GenPropertyChoice]
    quantityKey: String
    period: TimeOfUseType
    propertyTypes: TariffPropertyType
    operator: String
    propertyValue: String
    minValue: String
    maxValue: String
    isDefault: Boolean
  }`