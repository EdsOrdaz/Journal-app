import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { JournalApp } from './JournalApp.jsx'

import './style.css'
import 'animate.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <HashRouter>
        <JournalApp />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)

