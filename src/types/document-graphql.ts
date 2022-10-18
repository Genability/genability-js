import gql from 'graphql-tag';

export const documentGraphQLSchema = gql`
    type Document {
        documentId: ID!
        documentTitle: String!
        sectionTypes: String
        archiveUrl: String
        sourceUrl: String!
        sourceContentType: String!
        lseId: ID!
        lseName: String!
        territoryId: ID
        territoryName: String
        sequenceNumber: Int!
        sections: [DocumentSection!]!
    }
  
    type DocumentSection {
        documentSectionId: ID!
        documentId: ID!
        sectionHeading: String!
        sectionType: UsageType!
        startPage: Int!
        customerClass: CustomerClass!
        revised: Boolean!
    }
`