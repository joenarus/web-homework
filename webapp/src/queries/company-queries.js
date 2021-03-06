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

export const ADD_COMPANY = gql`
    mutation(
        $name: String!, 
        $creditLine: Float!
    ){
        createCompany(
            name: $name, 
            creditLine: $creditLine
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
