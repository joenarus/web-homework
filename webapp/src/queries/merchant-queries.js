import gql from 'graphql-tag'

export const GET_MERCHANTS = gql`
    {
        merchants {
            id
            name
            description
        }
    }
`

export const ADD_MERCHANT = gql`
    mutation(
        $name: String!, 
        $description: String!
    ){
        createMerchant(
            name: $name, 
            description: $description
        ){
            id
        }
    }    
`

export const DELETE_MERCHANT = gql`
  mutation(
    $id: ID!
  ){
    deleteMerchant(
      id: $id
    ) {
      id
    }
  }
`

export const EDIT_MERCHANT = gql`
    mutation(
        $name: String!, 
        $description: String!
    ){
        updateUser(
            id: $id,
            name: $name, 
            description: $description
        ){
            id
        }
    }   
`
