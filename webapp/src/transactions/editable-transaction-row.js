import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_TRANSACTION, DELETE_TRANSACTION } from '../queries/transaction-queries'
import { PencilSquare } from '@emotion-icons/bootstrap/PencilSquare'
import { CancelPresentation } from '@emotion-icons/material-rounded/CancelPresentation'
import { Trash } from '@emotion-icons/bootstrap/Trash'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

EditableTransactionRow.propTypes = {
  transaction: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired
}

export function EditableTransactionRow ({ merchants, transaction, users }) {
  const [editTransaction] = useMutation(EDIT_TRANSACTION)
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)

  const [editing, setEditing] = useState(false)

  const [currentChanges, setCurrentChanges] = useState(generateUserAndMerchantData({ ...transaction }))

  function generateUserAndMerchantData (transaction) {
    return { ...transaction, merchant: transaction.merchant.id, user: transaction.user.id, company: transaction.company.id }
  }

  function handleRemoveTransaction (transaction) {
    deleteTransaction({ variables: { ...transaction } })
  }

  const handleSubmit = event => {
    event.preventDefault()
    editTransaction({ variables: { ...currentChanges } })
    setEditing(false)
  }

  const handleUserChange = event => {
    const target = event.target
    const user = users.find(u => u.id === target.value)
    const newTransaction = { ...currentChanges, user: target.value, company: user.company.id }
    setCurrentChanges(newTransaction)
  }

  const handleRadioChange = event => {
    const target = event.target
    let newTransaction
    if (target.value === 'credit') {
      newTransaction = { ...currentChanges, credit: true, debit: false }
    } else {
      newTransaction = { ...currentChanges, credit: false, debit: true }
    }
    setCurrentChanges(newTransaction)
  }

  const handleInputChange = event => {
    const target = event.target
    const value = target.name === 'amount' ? parseFloat(target.value) : target.value
    const name = target.name
    const newTransaction = { ...currentChanges, [name]: value }
    setCurrentChanges(newTransaction)
  }
  return (
    <Fragment>
      <div className='transaction-row' css={transactionRow} key={transaction.id}>
        {!editing ? (
          <Fragment>
            <div className='transaction-cell'>
              {transaction.user.firstName + ' ' + transaction.user.lastName}
            </div>
            <div className='transaction-cell'>
              {transaction.merchant.name}
            </div>
            <div className='transaction-cell'>
              <p className='description'>
                {transaction.description}
              </p>
            </div>
            <div className={(transaction.credit ? 'credit' : 'debit') + ' transaction-cell'}>
              {(transaction.credit ? '+ $' : transaction.debit ? '- $' : '') + parseFloat(transaction.amount).toFixed(2) }
            </div>
            <div className='action-btn'>
              <PencilSquare className='action-btn' onClick={() => setEditing(true)} size='25' />
              <Trash className='action-btn' onClick={() => handleRemoveTransaction(transaction)} size='25' />
            </div>
          </Fragment>
        )
          : (
            <Fragment>
              <div className='transaction-cell'>
                <select name='user' onBlur={handleInputChange} onChange={handleUserChange} required value={currentChanges.user}>
                  <option value={null}>None</option>
                  {users.map((user) => <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>)}
                </select>
              </div>
              <div className='transaction-cell'>
                <select name='merchant' onBlur={handleInputChange} onChange={handleInputChange} required value={currentChanges.merchant}>
                  <option value={null}>None</option>
                  {merchants.map((merchant) => <option key={merchant.id} value={merchant.id}>{merchant.name}</option>)}
                </select>
              </div>
              <div className='transaction-cell'>
                <textarea name='description' onChange={handleInputChange} value={currentChanges.description} />
              </div>
              <div className='transaction-cell'>
                <div className='debit-credit'>
                  <label>
                                Debit
                    <input checked={currentChanges.debit} name='debit-or-credit' onChange={handleRadioChange} required type='radio' value='debit' />
                  </label>
                  <label>
                                Credit
                    <input checked={currentChanges.credit} name='debit-or-credit' onChange={handleRadioChange} type='radio' value='credit' />
                  </label>
                </div>
                <input className={'amount ' + (currentChanges.credit ? 'credit' : 'debit')} name='amount' onChange={handleInputChange} step='0.01' type='number' value={currentChanges.amount} />
              </div>
              <input form={currentChanges.id} onClick={handleSubmit} type='submit' value='Save' />
              <CancelPresentation className='action-btn' onClick={() => setEditing(false)} size='25' />
            </Fragment>
          )
        }
      </div>
    </Fragment>
  )
}

const transactionRow = css`
    {
        :nth-of-type(2n) {background-color: lightgray;}
        display: flex;
        flex-wrap: wrap;
        align-items:center;
        alight-content: space-between
        width: 100%;
    }
    .transaction-cell {
        width: 100px;
        flex: 1 2;
        padding-left: 12px;
        display: flex;
        flex-direction: row;
        font-size: 20px;
        .debit-credit {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            font-size: 12px;
        }
        .amount {
            padding-left: 12px;
            font-size: 20px;
        }
        select {
            width: 100%;
            height: 30px;
            font-size: 20px;
        }
        textarea {
            width: 100%;
            height: 30px;
            font-size: 16px;
        }
    }
    .description {
        word-break: break-all 
    }
    .credit {
        color: #008525
    }
        
    .debit {
        color: #a10005
    }
        
    .action-btn {
        padding:10px;
        :hover {
            {cursor: pointer;}
        }
    }
`
