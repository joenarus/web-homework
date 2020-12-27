import React, { useState, Fragment, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../queries/transaction-queries'
import { AddTransaction } from './add-transactions'

export function TransactionsPage () {
  const { data } = useQuery(GET_TRANSACTIONS)

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions)
    }
  }, [data])

  return (
    <Fragment>
      <h2>Transactions</h2>
      <AddTransaction />
      <h3>Past Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Merchant</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.user.firstName + ' ' + transaction.user.lastName}</td>
              <td>{transaction.merchant.name}</td>
              <td>{transaction.description}</td>
              <td>{(transaction.credit ? '+' : transaction.debit ? '-' : '') + transaction.amount }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}
