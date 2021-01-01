import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_TRANSACTION, DELETE_TRANSACTION } from '../queries/transaction-queries'
import { PencilSquare } from '@emotion-icons/bootstrap/PencilSquare'
import { CancelPresentation } from '@emotion-icons/material-rounded/CancelPresentation'
import { Trash } from '@emotion-icons/bootstrap/Trash'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

EditableTransactionRow.propTypes = {
  transaction: PropTypes.object.isRequired
}

export function EditableTransactionRow ({ transaction }) {
  const [editTransaction] = useMutation(EDIT_TRANSACTION)
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)

  const [editing, setEditing] = useState(false)

  const [currentChanges, setCurrentChanges] = useState({ ...transaction })

  function handleEditTransaction (transaction) {
    editTransaction({ variables: generateVariables({ ...transaction }) })
    setEditing(false)
  }

  function handleRemoveTransaction (transaction) {
    deleteTransaction({ variables: generateVariables({ ...transaction }) })
  }

  function generateVariables (transaction) {
    return { ...transaction, merchant: transaction.merchant.id, user: transaction.user.id, company: transaction.company.id }
  }

  const handleSubmit = event => {
    event.preventDefault()
    handleEditTransaction(currentChanges)
  }

  const handleUserChange = event => {
    console.log(event)
    // const target = event.target
    // const user = users.find(u => u.id === target.value)
    // const newTransaction = { ...transaction, user: target.value, company: user.company.id }
    // console.log(newTransaction)
  }

  const handleRadioChange = event => {
    const target = event.target
    let transaction
    if (target.value === 'credit') {
      transaction = { ...currentChanges, credit: true, debit: false }
    } else {
      transaction = { ...currentChanges, credit: false, debit: true }
    }
    console.log(transaction)
    setCurrentChanges(transaction)
  }

  const handleInputChange = event => {
    const target = event.target
    const value = target.name === 'amount' ? parseFloat(target.value) : target.value
    const name = target.name
    const newTransaction = { ...currentChanges, [name]: value }
    setCurrentChanges(newTransaction)
  }

  if (!editing) {
    return (
      <Fragment>
        <div className='transaction-row' css={transactionRow} key={transaction.id}>
          <div className='transaction-cell'>
            {transaction.user.firstName + ' ' + transaction.user.lastName}
          </div>
          <div className='transaction-cell'>
            {transaction.merchant.name}
          </div>
          <div className='transaction-cell'>
            {transaction.description}
          </div>
          <div className={(transaction.credit ? 'credit' : 'debit') + ' transaction-cell'}>
            {(transaction.credit ? '+ $' : transaction.debit ? '- $' : '') + transaction.amount }
          </div>
          <div className='action-btn'>
            <PencilSquare className='action-btn' onClick={() => setEditing(true)} size='20' />
            <Trash className='action-btn' onClick={() => handleRemoveTransaction(transaction)} size='20' />
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <form id={transaction.id}>
          <div className='transaction-row' css={transactionRow} key={transaction.id}>
            <div className='transaction-cell'>
              <label>
                <select name='user' onBlur={handleInputChange} onChange={handleUserChange} required value={currentChanges.user}>
                  <option value={null}>None</option>
                  {/* {users.map((user) => <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>)} */}
                </select>
              </label>
            </div>
            <div className='transaction-cell'>
              <label>
                <select name='merchant' onBlur={handleInputChange} onChange={handleInputChange} required value={currentChanges.merchant}>
                  <option value={null}>None</option>
                  {/* {merchants.map((merchant) => <option key={merchant.id} value={merchant.id}>{merchant.name}</option>)} */}
                </select>
              </label>
            </div>
            <div className='transaction-cell'>
              <label>
                <input name='description' onChange={handleInputChange} type='text' value={currentChanges.description} />
              </label>
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
            <CancelPresentation className='action-btn' onClick={() => setEditing(false)} size='20' />
          </div>
        </form>
      </Fragment>
    )
  }
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
