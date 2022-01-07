import gql from 'graphql-tag';

export const lseGraphQLSchema = gql`
    enum ServiceType {
        ELECTRICITY,
        GAS,
        SOLAR_PV
    }
`