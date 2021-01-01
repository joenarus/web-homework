import React, { useState, Fragment, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../queries/transaction-queries'
import { GET_USERS } from '../queries/user-queries'
import { AddTransaction } from './add-transactions'
import { EditableTransactionRow } from './editable-transaction-row'
import { css } from '@emotion/core'
import { GET_MERCHANTS } from '../queries/merchant-queries'
export function TransactionsPage () {
  const { data } = useQuery(GET_TRANSACTIONS, { pollInterval: 200 })
  const userData = useQuery(GET_USERS)
  const merchantData = useQuery(GET_MERCHANTS)
  const [transactions, setTransactions] = useState([])
  const [users, setUsers] = useState([])
  const [merchants, setMerchants] = useState([])

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions)
    } if (userData.data && userData.data.users) {
      setUsers(userData.data.users)
    } if (merchantData.data && merchantData.data.merchants) {
      setMerchants(merchantData.data.merchants)
    }
  }, [data, userData, merchantData])

  return (
    <Fragment>
      <h1>Transactions</h1>
      <AddTransaction merchants={merchants} users={users} />
      <h2>Past Transactions</h2>
      <div css={transactionMainBody}>
        <div className='transaction-header'>
          <div className='transaction-header-cell'>
            <h3>User</h3>
          </div>
          <div className='transaction-header-cell'>
            <h3>Vendor</h3>
          </div>
          <div className='transaction-header-cell'>
            <h3>Description</h3>
          </div>
          <div className=' transaction-header-cell'>
            <h3>Amount</h3>
          </div>
          <div className='transaction-header-actions'>
            <h3>Actions</h3>
          </div>
        </div>
        <div className='transaction-list'>
          {transactions.map(transaction => (
            <EditableTransactionRow key={transaction.id} merchants={merchants} transaction={transaction} users={users} />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

const transactionMainBody = css`
  width: 100%;
  .transaction-header {
    display: flex;
    align-items:center;
    alight-content: space-between
  }
  .transaction-header-cell {
    width: 100px;
    flex: 1;
    padding-left: 12px;
    display: flex;
    flex-direction: row;
  }
  .transaction-header-actions {
    padding-right: 12px;
  }
`

// const transactionBody = css`
// tr {
//   height: 80px;
// }
// tr:nth-child(even) {background-color: lightgray;}

// .credit {
//   color: #008525
// }

// .debit {
//   color: #a10005
// }

// .action-btn {
//   padding:10px;
//   :hover {
//     {cursor: pointer;}
//   }
// }
// `
