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
            insertedAt
            category
            user {
                id
                firstName
                lastName
            }
            merchant {
                id
                name
            }
            company {
                id
            }
        }
    }
`
export const ADD_TRANSACTION = gql`
    mutation(
        $amount: Float!, 
        $debit: Boolean!, 
        $credit: Boolean!, 
        $description: String!,
        $category: String!, 
        $merchant: ID!, 
        $user: ID!,
        $company: ID!
    ){
        createTransaction(
            amount: $amount, 
            description: $description, 
            category: $category, 
            credit: $credit, 
            debit: $debit,
            merchantId: $merchant, 
            userId: $user,
            companyId: $company
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
        $amount: Float!, 
        $debit: Boolean!, 
        $credit: Boolean!, 
        $description: String!, 
        $category: String!, 
        $merchant: ID!, 
        $user: ID!,
        $company: ID!
    ){
        updateTransaction(
            id: $id,
            amount: $amount, 
            description: $description, 
            category: $category, 
            credit: $credit, 
            debit: $debit,
            merchantId: $merchant, 
            userId: $user,
            companyId: $company
        ){
            id
        }
    }   
    
`
