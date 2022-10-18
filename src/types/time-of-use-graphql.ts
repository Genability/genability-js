import gql from 'graphql-tag'

export const timeOfUseGraphQLSchema = gql`
    type TimeOfUseInterval {
        touId: ID!
        touName: String
        touGroupId: ID
        fromDateTime: String
        toDateTime: String
    }
    
    type TimeOfUsePeriod {
        touPeriodId: ID!
        touId: ID
        fromDayOfWeek: Int
        fromHour: Int
        fromMinute: Int
        toDayOfWeek: Int
        toHour: Int
        toMinute: Int
    }

    type TimeOfUse {
        touId: ID!
        touName: String
        touGroupId: ID
        lseId: ID
        calendarId: ID
        season: Season
        touType: TimeOfUseType
        isDynamic: Boolean
        touPeriods: [TimeOfUsePeriod]
        privacy: String
    }

    type TimeOfUseGroup {
        lseId: ID!
        touGroupId: ID!
        timeOfUses: [TimeOfUse]
    }
`