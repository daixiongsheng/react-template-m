import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import { ProvideAuth } from './hooks'
import 'antd-mobile/dist/antd-mobile.css'

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
)
