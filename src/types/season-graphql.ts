import gql from 'graphql-tag';

export const seasonGraphQLSchema = gql`
    enum PredominanceRule {
        PREDOMINANT,
        SUBSERVIENT
    }

    type Season {
        seasonId: ID!
        lseId: ID
        seasonGroupId: ID
        seasonName: String
        seasonFromMonth: Int
        seasonFromDay: Int
        fromEdgePredominance: PredominanceRule
        seasonToMonth: Int
        seasonToDay: Int
        toEdgePredominance: PredominanceRule
    }
`