
import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_COMPANY } from '../queries/company-queries'

export function AddCompanies () {
  const [createCompany] = useMutation(ADD_COMPANY)

  const [currentCompany, setCurrentCompany] = useState({ name: '', creditLine: '' })

  const handleInputChange = event => {
    const target = event.target
    const value = target.name === 'creditLine' ? parseFloat(target.value) : target.value
    const name = target.name
    const company = { ...currentCompany, [name]: value }
    setCurrentCompany(company)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(currentCompany)
    createCompany({ variables: currentCompany })
    // Query will go here
    setCurrentCompany({ name: '', creditLine: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Company</h3>
      <label>
      Name
        <input name='name' onChange={handleInputChange} type='text' value={currentCompany.name} />
      </label>
      <label>
      Amount
        <input name='creditLine' onChange={handleInputChange} step='0.01' type='number' value={currentCompany.creditLine} />
      </label>
      <input type='submit' value='Save' />
    </form>
  )
}
