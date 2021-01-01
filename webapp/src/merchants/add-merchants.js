
import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_MERCHANT } from '../queries/merchant-queries'

export function AddMerchant () {
  const [createMerchant] = useMutation(ADD_MERCHANT)

  const [currentMerchant, setCurrentMerchant] = useState({ name: '', description: '' })

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    const merchant = { ...currentMerchant, [name]: value }
    setCurrentMerchant(merchant)
  }

  const handleSubmit = event => {
    event.preventDefault()
    createMerchant({ variables: currentMerchant })
    // Query will go here
    setCurrentMerchant({ name: '', description: '' })
  }

  return (
    <form onSubmit={handleSubmit}>

      <h3>Add Merchant</h3>
      <label>
      Name
        <input name='name' onChange={handleInputChange} type='text' value={currentMerchant.name} />
      </label>
      <label>
      Description
        <input name='description' onChange={handleInputChange} type='text' value={currentMerchant.description} />
      </label>
      <input type='submit' value='Save' />
    </form>
  )
}
