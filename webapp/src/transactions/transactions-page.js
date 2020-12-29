import React, { useState, Fragment, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TRANSACTIONS, EDIT_TRANSACTION, DELETE_TRANSACTION } from '../queries/transaction-queries'
import { AddTransaction } from './add-transactions'
import { css } from '@emotion/core'

export function TransactionsPage () {
  const { data } = useQuery(GET_TRANSACTIONS, { pollInterval: 200 })
  const [editTransaction] = useMutation(EDIT_TRANSACTION)
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (data && data.transactions) {
      console.log(data.transactions)
      setTransactions(data.transactions)
    }
  }, [data])

  function handleEditTransaction (transaction) {
    console.log(transaction)
    editTransaction({ variables: generateVariables(transaction) })
  }

  function handleRemoveTransaction (transaction) {
    deleteTransaction({ variables: generateVariables(transaction) })
  }

  function generateVariables (transaction) {
    return { ...transaction, merchant: transaction.merchant.id, user: transaction.user.id }
  }

  return (
    <Fragment>
      <h2>Transactions</h2>
      <AddTransaction />
      <h3>Past Transactions</h3>
      <table css={transactionTable}>
        <thead>
          <tr>
            <th>User</th>
            <th>Merchant</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody css={transactionBody}>
          {transactions.map(transaction => (
            <tr className='transaction' key={transaction.id}>
              <td>{transaction.user.firstName + ' ' + transaction.user.lastName}</td>
              <td>{transaction.merchant.name}</td>
              <td>{transaction.description}</td>
              <td className={transaction.credit ? 'credit' : 'debit'}>{(transaction.credit ? '+ $' : transaction.debit ? '- $' : '') + transaction.amount }</td>

              <td><button onClick={() => handleEditTransaction(transaction)}>Edit</button></td>
              <td><button onClick={() => handleRemoveTransaction(transaction)}>Remove</button></td>

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

.action-btns {
  margin-left:120px;
}
`
