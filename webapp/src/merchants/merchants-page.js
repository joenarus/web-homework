import React, { useState, Fragment, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_MERCHANTS, EDIT_MERCHANT, DELETE_MERCHANT } from '../queries/merchant-queries'
import { AddMerchant } from './add-merchants'
import { css } from '@emotion/core'
import { PencilSquare } from '@emotion-icons/bootstrap/PencilSquare'
import { Trash } from '@emotion-icons/bootstrap/Trash'
export function MerchantsPage () {
  const { data } = useQuery(GET_MERCHANTS, { pollInterval: 200 })
  const [editMerchant] = useMutation(EDIT_MERCHANT)
  const [deleteMerchant] = useMutation(DELETE_MERCHANT)

  const [merchants, setMerchants] = useState([])

  useEffect(() => {
    if (data && data.merchants) {
      setMerchants(data.merchants)
    }
  }, [data])

  function handleEditUser (merchant) {
    editMerchant({ variables: { ...merchant } })
  }

  function handleRemoveUser (merchant) {
    deleteMerchant({ variables: { ...merchant } })
  }

  return (
    <Fragment>
      <h2>Merchants</h2>
      <AddMerchant />
      <h3>Current Merchants</h3>
      <table css={transactionTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody css={transactionBody}>
          {merchants.map(merchant => (
            <tr className='transaction' key={merchant.id}>
              <td>{merchant.name}</td>
              <td>{merchant.description}</td>
              <td>
                <PencilSquare className='action-btn' onClick={() => handleEditUser(merchant)} size='40' />
                <Trash className='action-btn' onClick={() => handleRemoveUser(merchant)} size='40' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

const transactionTable = css`
  width: 100%;
`

const transactionBody = css`
tr {
  height: 80px;
}
tr:nth-child(even) {background-color: lightgray;}

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
