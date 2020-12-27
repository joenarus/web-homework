
import React, { useState, useEffect, Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_MERCHANTS } from '../queries/merchant-queries'
import { GET_USERS } from '../queries/user-queries'
// import { GET_USERS } from '../queries/user-queries'

// const useUserState = () => {
//   const { userData } = useQuery(GET_USERS)
//   const [users, setUsers] = useState([])
//   useEffect(() => {
//     if (userData && userData.users) {
//       console.log(userData)
//       setUsers(userData.users)
//     }
//   }, [userData])
//   return { users }
// }

export function AddTransaction () {
  const [merchants, setMerchants] = useState([])
  const [users, setUsers] = useState([])
  const merchantData = useQuery(GET_MERCHANTS)
  const userData = useQuery(GET_USERS)
  useEffect(() => {
    if (merchantData.data && merchantData.data.merchants) {
      setMerchants(merchantData.data.merchants)
    } if (userData.data && userData.data.users) {
      setUsers(userData.data.users)
    }
  }, [merchantData.data, userData.data])

  const [currentTransaction, setCurrentTransaction] = useState({ amount: null, user: null, merchant: null, description: null, credit: false, debit: false })
  const handleInputChange = event => {
    const target = event.target
    // eslint-disable-next-line no-debugger
    debugger
    const value = target.type === 'checkbox' ? target.checked : target.value

    const name = target.name

    const transaction = { ...currentTransaction, [name]: value }
    setCurrentTransaction(transaction)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Query will go here
    setCurrentTransaction({ amount: '', user: '', merchant: '', description: '', credit: false, debit: false })
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>

        <h3>Add Transaction</h3>
        <label>
      Amount
          <input name='amount' onChange={handleInputChange} type='text' />
        </label>
        <label>
      User
          <select name='user' onBlur={handleInputChange} >
            {users.map((user) => <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>)}
          </select>
        </label>
        <label>
      Merchant
          <select name='merchant' onBlur={handleInputChange}>
            {merchants.map((merchant) => <option key={merchant.id} value={merchant.id}>{merchant.name}</option>)}
          </select>
        </label>
        <label>
      Description
          <input name='description' onChange={handleInputChange} type='text' />
        </label>
        <input type='submit' value='Save' />

      </form>
    </Fragment>
  )
}
