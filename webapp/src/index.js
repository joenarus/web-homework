import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as Hooks } from '@apollo/react-hooks'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <Hooks client={client}>
          <AppRouter />
        </Hooks>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
