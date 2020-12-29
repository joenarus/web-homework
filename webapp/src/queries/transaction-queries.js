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
                id
                firstName
                lastName
            }
            merchant {
                id
                name
            }
        }
    }
`
export const ADD_TRANSACTION = gql`
    mutation(
        $amount: Int!, 
        $debit: Boolean!, 
        $credit: Boolean!, 
        $description: String!, 
        $merchant: ID!, 
        $user: ID!
    ){
        createTransaction(
            amount: $amount, 
            description: $description, 
            credit: $credit, 
            debit: $debit,
            merchantId: $merchant, 
            userId: $user
        ){
            id
        }
    }   
    
`

export const DELETE_TRANSACTION = gql`
  mutation(
    $id: ID!
  ){
    deleteTransaction(
      id: $id
    ) {
      id
    }
  }
`

export const EDIT_TRANSACTION = gql`
    mutation(
        $id: ID!,
        $amount: Int!, 
        $debit: Boolean!, 
        $credit: Boolean!, 
        $description: String!, 
        $merchant: ID!, 
        $user: ID!
    ){
        updateTransaction(
            id: $id,
            amount: $amount, 
            description: $description, 
            credit: $credit, 
            debit: $debit,
            merchantId: $merchant, 
            userId: $user
        ){
            id
        }
    }   
    
`
