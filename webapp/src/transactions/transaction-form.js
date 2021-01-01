
import React, { Fragment } from 'react'
import { CancelPresentation } from '@emotion-icons/material-rounded/CancelPresentation'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

TransactionForm.propTypes = {
  transaction: PropTypes.object.isRequired,
  updateTransactionMethod: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  setEditing: PropTypes.func.isRequired,
  submitMethod: PropTypes.func.isRequired

}

export function TransactionForm ({ transaction, updateTransactionMethod, merchants, users, setEditing, submitMethod }) {
  const handleInputChange = event => {
    const target = event.target
    const value = target.name === 'amount' ? parseFloat(target.value) : target.value
    const name = target.name
    const newTransaction = { ...transaction, [name]: value }
    updateTransactionMethod(newTransaction)
  }

  const handleRadioChange = event => {
    const target = event.target
    let newTransaction
    if (target.value === 'credit') {
      newTransaction = { ...transaction, credit: true, debit: false }
    } else {
      newTransaction = { ...transaction, credit: false, debit: true }
    }
    updateTransactionMethod(newTransaction)
  }

  const handleUserChange = event => {
    const target = event.target
    const user = users.find(u => u.id === target.value)
    const newTransaction = { ...transaction, user: target.value, company: user.company.id }
    updateTransactionMethod(newTransaction)
  }

  return (
    <Fragment>
      <form>
        <div className='transaction-row' css={addableTransaction}>
          <div className='transaction-cell'>
            <select name='user' onBlur={handleInputChange} onChange={handleUserChange} required value={transaction.user}>
              <option value={null}>None</option>
              {users.map((user) => <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>)}
            </select>
          </div>
          <div className='transaction-cell'>
            <select name='merchant' onBlur={handleInputChange} onChange={handleInputChange} required value={transaction.merchant}>
              <option value={null}>None</option>
              {merchants.map((merchant) => <option key={merchant.id} value={merchant.id}>{merchant.name}</option>)}
            </select>
          </div>
          <div className='transaction-cell'>
            <textarea name='description' onChange={handleInputChange} type='textbox' value={transaction.description} />
          </div>
          <div className='transaction-cell'>
            <div className='debit-credit'>
              <div className='debit-credit-cell'>
                <label htmlFor='debit'>
                  Debit
                </label>
                <input checked={transaction.debit} id='debit' name='debit-or-credit' onChange={handleRadioChange} required type='radio' value='debit' />
              </div>
              <div className='debit-credit-cell'>
                <label htmlFor='credit'>
                  Credit
                </label>
                <input checked={transaction.credit} id='credit' name='debit-or-credit' onChange={handleRadioChange} type='radio' value='credit' />
              </div>
            </div>
            <input className={'amount ' + (transaction.credit ? 'credit' : 'debit')} name='amount' onChange={handleInputChange} step='0.01' type='number' value={transaction.amount} />
          </div>
          <input onClick={submitMethod} type='submit' value='Save' />
          <CancelPresentation className='action-btn' onClick={() => setEditing(false)} size='40' />
        </div>
      </form>
    </Fragment>
  )
}

const addableTransaction = css`
    {
        display: flex;
        flex-wrap: nowrap;
        align-items:center;
        alight-content: space-between;
    }
    
    .transaction-cell {
      flex: 1 2;
      padding-left: 12px;
      display: flex;
      flex-direction: row;
      font-size: 18px;
      .debit-credit {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 12px;
          padding-right: 12px;
          .debit-credit-cell {
              label {

              }
              input {
                margin-left: 12px;
              }
          }
      }
      .amount {
          padding-left: 12px;
          font-size: 18px;
      }
      select {
          width: 100%;
          height: 30px;
          font-size: 18px;
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