import gql from 'graphql-tag'

export const GET_COMPANIES = gql`
    {
        companies {
            id
            name
            availableCredit
            creditLine
        }
    }
`

export const ADD_TRANSACTION = gql`
    mutation(
        $name: String!, 
        $creditLine: Float!
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

export const DELETE_COMPANY = gql`
  mutation(
    $id: ID!
  ){
    deleteCompany(
      id: $id
    ) {
      id
    }
  }
`
