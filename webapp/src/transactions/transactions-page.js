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
      <div css={transactionMainBody}>
        <h2>Past Transactions</h2>
        <div className='transaction-wrapper'>
          <div className='transaction-header'>
            <div className='transaction-header-cell'>
              <h5>User</h5>
            </div>
            <div className='transaction-header-cell'>
              <h5>Vendor</h5>
            </div>
            <div className='transaction-header-cell'>
              <h5>Description</h5>
            </div>
            <div className=' transaction-header-cell'>
              <h5>Amount</h5>
            </div>
            <div className='transaction-header-actions'>
              <h5>Actions</h5>
            </div>
          </div>
          <div className='transaction-list'>
            {transactions.map(transaction => (
              <EditableTransactionRow key={transaction.id} merchants={merchants} transaction={transaction} users={users} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const transactionMainBody = css`
  width: 100%;
  padding-top: 20px;
  .transaction-wrapper {
    padding-top: 20px;
  }
  .transaction-header {
    display: flex;
    align-items:center;
    alight-content: space-between;
    flex-wrap: nowrap;
  }
  .transaction-header-cell {
    width: 100px;
    flex: 1 2;
    padding-left: 12px;
    display: flex;
    flex-direction: row;
  }
  .transaction-header-actions {
    padding-right: 12px;
  }
`
