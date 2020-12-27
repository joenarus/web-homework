import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
    {
        transactions {
            amount
            description
            description
            credit
            debit
        }
    }
`
