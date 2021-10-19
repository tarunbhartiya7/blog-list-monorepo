import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from '@material-ui/core'

import store from './store'
import App from './App'
import './index.css'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Container>
        <App />
      </Container>
    </Provider>
  </Router>,
  document.getElementById('root')
)
