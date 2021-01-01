import React, { useState, Fragment, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../queries/transaction-queries'
import { AddTransaction } from './add-transactions'
import { EditableTransactionRow } from './editable-transaction-row'
import { css } from '@emotion/core'
export function TransactionsPage () {
  const { data } = useQuery(GET_TRANSACTIONS, { pollInterval: 200 })
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

      <div css={transactionMainBody}>
        {transactions.map(transaction => (
          <EditableTransactionRow key={transaction.id} transaction={transaction} />
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
