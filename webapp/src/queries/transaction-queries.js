import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
    {
        transactions {
            id
            amount
            description
            description
            credit
            debit
            user {
                firstName
                lastName
            }
            merchant {
                name
            }
        }
    }
`
