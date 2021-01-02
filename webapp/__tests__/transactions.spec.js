import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, screen, fireEvent } from '@testing-library/react'
import { TransactionForm } from '../src/transactions/transaction-form'

let mockTransaction = { credit: false, debit: false }

describe('TransactionForm component', () => {
  const mockMethods = {
    submitMethod: jest.fn(),
    updateTransactionMethod: (transaction) => { mockTransaction = transaction },
    setEditing: jest.fn()
  }
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TransactionForm merchants={[]}
          setEditing={mockMethods.setEditing}
          submitMethod={mockMethods.submitMethod}
          transaction={mockTransaction}
          updateTransactionMethod={mockMethods.updateTransactionMethod}
          users={[{ id: '123', firstName: 'Test', lastName: 'User' }]}
        />
      </BrowserRouter>, { wrapper: MockedProvider })
  })
  it('should load the TransactionForm component', () => {
    expect(screen.getByTestId('transaction-form')).toBeInTheDocument()
  })
  it('should call submit method that was passed', () => {
    fireEvent.click(screen.getByTestId('transaction-form-submit'))
    expect(mockMethods.submitMethod.mock.calls.length).toBe(1) // This throws an error, but passes the test because handleSumbit isn't supported
  })
  it('should change class type based on selection of credit or debit', () => {
    const category = screen.getByTestId('category-select')
    fireEvent.change(category, { target: { value: 'Other' } })
    expect(category.value).toBe('Other')
    const options = screen.getAllByTestId('category-select-option')
    expect(options[2].selected).toBeTruthy()
    expect(options[1].selected).toBeFalsy()
    expect(options[0].selected).toBeFalsy()
    expect(mockTransaction.category).toBe('Other')
  })
})
