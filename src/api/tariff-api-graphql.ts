import gql from 'graphql-tag'

export const getTariffsRequestGraphQLSchema = gql`
    input GetTariffRequest {
        populateProperties: Boolean
        populateRates: Boolean
        populateDocuments: Boolean
        effectiveOn: String
        territoryId: ID
        bundleRates: Boolean
        applicableRatesOnly: Boolean
        lookupVariableRates: Boolean
    }
    
    input GetTariffsRequest {
        lseId: ID
        masterTariffId: ID 
        effectiveOn: String
        customerClasses: [CustomerClass]
        serviceTypes: [ServiceType]
        tariffTypes: [TariffType]
        chargeTypes: [ChargeType]
        openOn: String
        isActive: Boolean
        fromDateTime: String
        toDateTime: String
        privacyFlags: [PrivacyFlag]
        zipCode: String
        postCode: String
        country: String
        addressString: String
        riderId: ID 
        populateProperties: Boolean
        populateRates: Boolean
        populateDocuments: Boolean
        consumption: Float
        demand: Float
        hasNetMetering: Boolean
        hasTimeOfUseRates: Boolean
        hasTieredRates: Boolean
        hasContractedRates: Boolean
        bundleRates: Boolean
        applicableRatesOnly: Boolean
        filterRiderRates: Boolean
        territoryId: ID 
    }
`