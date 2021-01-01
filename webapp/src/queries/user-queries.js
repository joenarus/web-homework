import gql from 'graphql-tag'

export const GET_USERS = gql`
    {
        users {
            id
            firstName
            lastName
            dob
            company {
                id
                name
            }
        }
    }
`

export const ADD_USER = gql`
    mutation(
        $firstName: String!, 
        $lastName: String!,
        $dob: String!, 
        $company: ID!
    ){
        createUser(
            firstName: $firstName, 
            lastName: $lastName, 
            dob: $dob,
            companyId: $company
        ){
            id
        }
    }    
`

export const DELETE_USER = gql`
  mutation(
    $id: ID!
  ){
    deleteUser(
      id: $id
    ) {
      id
    }
  }
`

export const EDIT_USER = gql`
    mutation(
        $firstName: String!, 
        $lastName: String!,
        $dob: String!, 
        $company: ID!
    ){
        updateUser(
            id: $id,
            firstName: $firstName, 
            lastName: $lastName, 
            dob: $dob,
            companyId: $company
        ){
            id
        }
    }   
`
