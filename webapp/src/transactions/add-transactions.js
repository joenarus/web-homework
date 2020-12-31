
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_MERCHANTS } from '../queries/merchant-queries'
import { GET_USERS } from '../queries/user-queries'
import { ADD_TRANSACTION } from '../queries/transaction-queries'

export function AddTransaction () {
  const [merchants, setMerchants] = useState([])
  const [users, setUsers] = useState([])
  const merchantData = useQuery(GET_MERCHANTS)
  const userData = useQuery(GET_USERS)
  const [createTransaction] = useMutation(ADD_TRANSACTION)

  useEffect(() => {
    if (merchantData.data && merchantData.data.merchants) {
      setMerchants(merchantData.data.merchants)
    } if (userData.data && userData.data.users) {
      setUsers(userData.data.users)
    }
  }, [merchantData.data, userData.data])

  const [currentTransaction, setCurrentTransaction] = useState({ amount: '', user: '', company: '', merchant: '', description: '', credit: false, debit: false })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'radio' ? target.checked : target.name === 'amount' ? parseFloat(target.value) : target.value
    const name = target.type === 'radio' ? target.value : target.name
    const transaction = { ...currentTransaction, [name]: value }
    setCurrentTransaction(transaction)
  }

  const handleUserChange = event => {
    const target = event.target
    const user = users.find(u => u.id === target.value)
    const transaction = { ...currentTransaction, user: target.value, company: user.company.id }
    console.log(transaction)
    setCurrentTransaction(transaction)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createTransaction({ variables: currentTransaction })
    // Query will go here
    setCurrentTransaction({ amount: '', user: '', merchant: '', company: '', description: '', credit: false, debit: false })
  }

  return (
    <form onSubmit={handleSubmit}>

      <h3>Add Transaction</h3>
      <label>
      Debit
        <input name='debit-or-credit' onChange={handleInputChange} required type='radio' value='debit' />
      </label>
      <label>
      Credit
        <input name='debit-or-credit' onChange={handleInputChange} type='radio' value='credit' />
      </label>
      <label>
      Amount
        <input name='amount' onChange={handleInputChange} step='0.01' type='number' value={currentTransaction.amount} />
      </label>
      <label>
      User
        <select name='user' onBlur={handleInputChange} onChange={handleUserChange} required value={currentTransaction.user}>
          <option value={null}>None</option>
          {users.map((user) => <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>)}
        </select>
      </label>
      <label>
      Merchant
        <select name='merchant' onBlur={handleInputChange} onChange={handleInputChange} required value={currentTransaction.merchant}>
          <option value={null}>None</option>
          {merchants.map((merchant) => <option key={merchant.id} value={merchant.id}>{merchant.name}</option>)}
        </select>
      </label>
      <label>
      Description
        <input name='description' onChange={handleInputChange} type='text' value={currentTransaction.description} />
      </label>
      <input type='submit' value='Save' />
    </form>
  )
}
