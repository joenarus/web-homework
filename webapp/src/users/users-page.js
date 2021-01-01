import React, { useState, Fragment, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS, EDIT_USER, DELETE_USER } from '../queries/user-queries'
import { AddUser } from './add-users'
import { css } from '@emotion/core'
import { PencilSquare } from '@emotion-icons/bootstrap/PencilSquare'
import { Trash } from '@emotion-icons/bootstrap/Trash'
export function UsersPage () {
  const { data } = useQuery(GET_USERS, { pollInterval: 200 })
  const [editUser] = useMutation(EDIT_USER)
  const [deleteUser] = useMutation(DELETE_USER)

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users)
    }
  }, [data])

  function handleEditUser (user) {
    editUser({ variables: generateVariables({ ...user }) })
  }

  function handleRemoveUser (user) {
    deleteUser({ variables: generateVariables({ ...user }) })
  }

  function generateVariables (user) {
    return { ...user, company: user.company.id }
  }

  return (
    <Fragment>
      <h2>Users</h2>
      <AddUser />
      <h3>Current Users</h3>
      <table css={transactionTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody css={transactionBody}>
          {users.map(user => (
            <tr className='transaction' key={user.id}>
              <td>{user.firstName + ' ' + user.lastName}</td>
              <td>{user.dob}</td>
              <td>{user.company.name}</td>
              <td>
                <PencilSquare className='action-btn' onClick={() => handleEditUser(user)} size='40' />
                <Trash className='action-btn' onClick={() => handleRemoveUser(user)} size='40' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

const transactionTable = css`
  width: 100%;
`

const transactionBody = css`
tr {
  height: 80px;
}
tr:nth-child(even) {background-color: lightgray;}

.credit {
  color: #008525
}

.debit {
  color: #a10005
}

.action-btn {
  padding:10px;
  :hover {
    {cursor: pointer;}
  }
}
`
