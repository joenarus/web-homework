
import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { TransactionForm } from './transaction-form'
import { useMutation } from '@apollo/react-hooks'
import { ADD_TRANSACTION } from '../queries/transaction-queries'

AddTransaction.propTypes = {
  users: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired
}

export function AddTransaction ({ merchants, users }) {
  const [editing, setEditing] = useState(false)
  const [createTransaction] = useMutation(ADD_TRANSACTION)
  const [newTransaction, setNewTransaction] = useState({ amount: '', user: '', merchant: '', company: '', description: '', credit: false, debit: true })

  const handleAdd = event => {
    event.preventDefault()
    createTransaction({ variables: newTransaction })
    setEditing(false)
    setNewTransaction({ amount: '', user: '', merchant: '', company: '', description: '', credit: false, debit: true })
  }

  return (
    <Fragment>
      <div>
        {!editing ? (
          <Fragment>
            <button onClick={() => setEditing(true)}>Add New Transaction</button>
          </Fragment>
        ) : (
          <Fragment>
            <div css={addTransactionWrapper}>
              <div css={transactionHeader}>
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
                </div>
              </div>
              <TransactionForm merchants={merchants} setEditing={setEditing} submitMethod={handleAdd} transaction={newTransaction} updateTransactionMethod={setNewTransaction} users={users} />
            </div>
          </Fragment>
        )
        }
      </div>
    </Fragment>
  )
}

const addTransactionWrapper = css`
  .transaction-row {
    width: 75%;
  }
`

const transactionHeader = css`
.transaction-header {
  width: 75%;
  display: flex;
  align-items:center;
  alight-content: space-between
}
.transaction-header-cell {
  flex: 1;
  padding-left: 12px;
  display: flex;
  flex-direction: row;
}
`
