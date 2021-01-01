
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ADD_USER } from '../queries/user-queries'
import { GET_COMPANIES } from '../queries/company-queries'

export function AddUser () {
  const [companies, setCompanies] = useState([])
  const companyData = useQuery(GET_COMPANIES)
  const [createUser] = useMutation(ADD_USER)

  useEffect(() => {
    if (companyData.data && companyData.data.companies) {
      setCompanies(companyData.data.companies)
    }
  }, [companyData.data])

  const [currentUser, setCurrentUser] = useState({ firstName: '', lastName: '', dob: '', company: '' })

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    const user = { ...currentUser, [name]: value }
    setCurrentUser(user)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createUser({ variables: currentUser })
    // Query will go here
    setCurrentUser({ firstName: '', lastName: '', dob: '', company: '' })
  }

  return (
    <form onSubmit={handleSubmit}>

      <h3>Add User</h3>
      <label>
      First Name
        <input name='firstName' onChange={handleInputChange} type='text' value={currentUser.firstName} />
      </label>
      <label>
      Last Name
        <input name='lastName' onChange={handleInputChange} type='text' value={currentUser.lastName} />
      </label>
      <label>
      DOB
        <input name='dob' onChange={handleInputChange} type='text' value={currentUser.dob} />
      </label>
      <label>
      Company
        <select name='company' onBlur={handleInputChange} onChange={handleInputChange} required value={currentUser.company}>
          <option value={null}>None</option>
          {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
        </select>
      </label>
      <input type='submit' value='Save' />
    </form>
  )
}
