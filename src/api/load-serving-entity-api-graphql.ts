import gql from 'graphql-tag';

export const getLSEsRequestGraphQLSchema = gql`
  input GetLSEsRequest {
    postCode: String,
    zipCode: String,
    country: String,
    serviceTypes: [ServiceType!],
    ownerships: [Ownership]
  } 
`