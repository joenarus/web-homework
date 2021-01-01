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
      <h2>Transactions</h2>
      <AddTransaction />
      <h3>Past Transactions</h3>

      <div css={transactionMainBody}>
        {transactions.map(transaction => (
          <EditableTransactionRow key={transaction.id} merchants={merchants} transaction={transaction} users={users} />
        ))}

      </div>
    </Fragment>
  )
}

const transactionMainBody = css`
  width: 100%;
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
