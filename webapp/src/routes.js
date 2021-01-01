import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { TransactionsPage } from './transactions/transactions-page'
import { CompaniesPage } from './companies/companies-page'
import { UsersPage } from './users/users-page'
import { MerchantsPage } from './merchants/merchants-page'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/transactions'>Transactions</Link>
            </li>
            <li>
              <Link to='/companies'>Companies</Link>
            </li>
            <li>
              <Link to='/user'>Users</Link>
            </li>
            <li>
              <Link to='/merchants'>Merchants</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={TransactionsPage} path='/transactions' />
          <Route component={CompaniesPage} path='/companies' />
          <Route component={UsersPage} path='/user' />
          <Route component={MerchantsPage} path='/merchants' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
  padding: 8px;
`

const navStyle = css`
  grid-row: 1;

  & > ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }

  & > ul > li:not(:first-child) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
