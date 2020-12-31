import React, { useState, Fragment, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_COMPANIES, DELETE_COMPANY } from '../queries/company-queries'
import { css } from '@emotion/core'
import { PencilSquare } from '@emotion-icons/bootstrap/PencilSquare'
import { Trash } from '@emotion-icons/bootstrap/Trash'
export function CompaniesPage () {
  const { data } = useQuery(GET_COMPANIES, { pollInterval: 200 })
  const [deleteCompany] = useMutation(DELETE_COMPANY)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (data && data.companies) {
      setCompanies(data.companies)
    }
  }, [data])

  function handleRemoveCompany (company) {
    deleteCompany({ variables: { ...company } })
  }

  return (
    <Fragment>
      <h2>Add Company</h2>
      <h3>Companies</h3>
      <table css={transactionTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Credit Amount</th>
            <th>Available Credit</th>
          </tr>
        </thead>
        <tbody css={transactionBody}>
          {companies.map(company => (
            <tr className='transaction' key={company.id}>
              <td>{company.name}</td>
              <td>{company.creditLine}</td>
              <td>{company.availableCredit}</td>
              <td>
                <PencilSquare className='action-btn' size='40' />
                <Trash className='action-btn' onClick={() => handleRemoveCompany(company)} size='40' />
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
