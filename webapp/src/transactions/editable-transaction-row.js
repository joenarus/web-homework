import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_TRANSACTION, DELETE_TRANSACTION } from '../queries/transaction-queries'
import { PencilSquare } from '@emotion-icons/bootstrap/PencilSquare'
import { Trash } from '@emotion-icons/bootstrap/Trash'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { TransactionForm } from './transaction-form'
import { convertToRoman } from '../helpers/roman-numeral.util'

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

  function retrieveSetting (settingName) {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(settingName)
    }
  }

  function checkForRomanNumeral (amount) {
    const decimalAmount = parseFloat(transaction.amount).toFixed(2)
    let result = ''
    if (!(retrieveSetting('romanNumeralsActive') === 'true')) {
      result += amount
    } else {
      if (retrieveSetting('romanNumeralsDecimal') === 'true') {
        const str = decimalAmount.toString()
        const array = str.split('.')
        result += convertToRoman(parseInt(array[0])) + '.'
        result += convertToRoman(parseInt(array[1]))
      } else {
        result += convertToRoman(decimalAmount)
      }
    }
    return result
  }

  return (
    <Fragment>
      {!editing ? (
        <Fragment>
          <div className='transaction-row' css={transactionRow} key={transaction.id}>
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
              {(transaction.credit ? '+ $' : transaction.debit ? '- $' : '') + checkForRomanNumeral(transaction.amount) }
            </div>
            <div className='action-btn'>
              <PencilSquare className='action-btn' onClick={() => setEditing(true)} size='40' />
              <Trash className='action-btn' onClick={() => handleRemoveTransaction(transaction)} size='40' />
            </div>
          </div>
        </Fragment>
      )
        : (
          <Fragment>
            <div css={editTransactionForm}>
              <TransactionForm merchants={merchants} setEditing={setEditing} submitMethod={handleSubmit} transaction={currentChanges} updateTransactionMethod={setCurrentChanges} users={users} />
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}
const editTransactionForm = css`
{
    .transaction-row {
        width: 100%;
    }
}
`
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
        font-size: 18px;
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
