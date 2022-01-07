import gql from 'graphql-tag';

export const territoryGraphQLSchema = gql`
    enum UsageType {
        SERVICE,
        TARIFF,
        CLIMATE_ZONE,
        UTILITY_CLIMATE_ZONE
    }

    enum ItemType {
        STATE,
        COUNTY,
        CITY,
        ZIPCODE
    }

    type TerritoryItem {
        territoryItemId: ID!
        territoryType: String
        value: String
        exclude: Boolean
        partial: Boolean
    }

    type TerritoryLse {
        territoryId: ID!
        lseId: ID
        lseName: String
        distribution: Boolean
        supplierResidential: Boolean
        supplierGeneral: Boolean
        residentialCoverage: Float
        generalCoverage: Float
    }

    type CenterPoint {
        latitude: Float!
        longitude: Float!
    }

    type Territory {
        territoryId: ID!
        territoryName: String!
        lseId: ID!
        lseName: String!
        parentTerritoryId: ID
        usageType: UsageType
        itemTypes: [ItemType]
        items: [TerritoryItem]
        territoryLses: [TerritoryLse]
        deregRes: Boolean
        deregCandi: Boolean
        centerPoint: CenterPoint
    }
`;