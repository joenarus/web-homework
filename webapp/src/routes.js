import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { TransactionsPage } from './transactions/transactions-page'
import { CompaniesPage } from './companies/companies-page'
import { UsersPage } from './users/users-page'
import { MerchantsPage } from './merchants/merchants-page'
import { PageNotFound } from './page-not-found'
import { Navbar, Nav } from 'react-bootstrap'
import { SettingsPage } from './settings/settings-page'

function AppRouter () {
  return (
    <Router>
      <div className='py-3'>
        <Navbar bg='light' className='mb-3' collapseOnSelect expand='md'>
          <Navbar.Brand className='font-weight-bold text-muted' href='/'>
          Divvy Homework Assignment
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav>
            <Nav.Link href='/transactions'>Transactions</Nav.Link>
            <Nav.Link href='/companies'>Companies</Nav.Link>
            <Nav.Link href='/user'>Users</Nav.Link>
            <Nav.Link href='/merchants'>Merchants</Nav.Link>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            <Nav>
              <Nav.Link href='/settings'>Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className='main-content' css={contentStyle}>
        <Switch>
          <Route component={Home} exact path='/' />
          <Route component={TransactionsPage} path='/transactions' />
          <Route component={CompaniesPage} path='/companies' />
          <Route component={UsersPage} path='/user' />
          <Route component={MerchantsPage} path='/merchants' />
          <Route component={SettingsPage} path='/settings' />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter

const contentStyle = css`
  grid-row: 2;
  margin: 0px 20px 0px;
  .main-content {
  }
`
