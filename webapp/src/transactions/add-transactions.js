
import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { TransactionForm } from './transaction-form'
import { useMutation } from '@apollo/react-hooks'
import { ADD_TRANSACTION } from '../queries/transaction-queries'
import { Button } from 'react-bootstrap'

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
            <Button onClick={() => setEditing(true)}>Add New Transaction</Button>
          </Fragment>
        ) : (
          <Fragment>
            <div css={addTransactionWrapper}>
              <div css={transactionHeader}>
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
