
import React, { useState, Fragment } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_TRANSACTION } from '../queries/transaction-queries'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { CancelPresentation } from '@emotion-icons/material-rounded/CancelPresentation'

AddTransaction.propTypes = {
  users: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired
}

export function AddTransaction ({ merchants, users }) {
  const [createTransaction] = useMutation(ADD_TRANSACTION)
  const [editing, setEditing] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState({ amount: '', user: '', company: '', merchant: '', description: '', credit: false, debit: true })

  const handleInputChange = event => {
    const target = event.target
    const value = target.name === 'amount' ? parseFloat(target.value) : target.value
    const name = target.name
    const transaction = { ...currentTransaction, [name]: value }
    setCurrentTransaction(transaction)
  }

  const handleRadioChange = event => {
    const target = event.target
    let transaction
    if (target.value === 'credit') {
      transaction = { ...currentTransaction, credit: true, debit: false }
    } else {
      transaction = { ...currentTransaction, credit: false, debit: true }
    }
    setCurrentTransaction(transaction)
  }

  const handleUserChange = event => {
    const target = event.target
    const user = users.find(u => u.id === target.value)
    const transaction = { ...currentTransaction, user: target.value, company: user.company.id }
    setCurrentTransaction(transaction)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createTransaction({ variables: currentTransaction })
    setEditing(false)
    // Query will go here
    setCurrentTransaction({ amount: '', user: '', merchant: '', company: '', description: '', credit: false, debit: true })
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
            <form>
              <div className='transaction-row' css={addableTransaction}>
                <div className='transaction-cell'>
                  <select name='user' onBlur={handleInputChange} onChange={handleUserChange} required value={currentTransaction.user}>
                    <option value={null}>None</option>
                    {users.map((user) => <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>)}
                  </select>
                </div>
                <div className='transaction-cell'>
                  <select name='merchant' onBlur={handleInputChange} onChange={handleInputChange} required value={currentTransaction.merchant}>
                    <option value={null}>None</option>
                    {merchants.map((merchant) => <option key={merchant.id} value={merchant.id}>{merchant.name}</option>)}
                  </select>
                </div>
                <div className='transaction-cell'>
                  <textarea name='description' onChange={handleInputChange} type='textbox' value={currentTransaction.description} />
                </div>
                <div className='transaction-cell'>
                  <div className='debit-credit'>
                    <label>
                    Debit
                      <input checked={currentTransaction.debit} name='debit-or-credit' onChange={handleRadioChange} required type='radio' value='debit' />
                    </label>
                    <label>
                    Credit
                      <input checked={currentTransaction.credit} name='debit-or-credit' onChange={handleRadioChange} type='radio' value='credit' />
                    </label>
                  </div>
                  <input className={'amount ' + (currentTransaction.credit ? 'credit' : 'debit')} name='amount' onChange={handleInputChange} step='0.01' type='number' value={currentTransaction.amount} />
                </div>
                <input onClick={handleSubmit} type='submit' value='Save' />
                <CancelPresentation className='action-btn' onClick={() => setEditing(false)} size='25' />
              </div>
            </form>
          </Fragment>
        )
        }
      </div>
    </Fragment>
  )
}

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

const addableTransaction = css`
    {   width: 75%;
        display: flex;
        flex-wrap: nowrap;
        align-items:center;
        alight-content: space-between;
        
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
`
