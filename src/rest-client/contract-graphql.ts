import gql from 'graphql-tag';

export const BaseRequestGraphQLSchema = gql`    
    input BaseRequest {
        pageStart: Int
        pageCount: Int
        search: String
        searchOn: [String!]
        startsWith: Boolean
        endsWith: Boolean
        isRegex: Boolean
        sortOn: [String!]
        sortOrder: [SortOrder]
        fields: String
    }
`