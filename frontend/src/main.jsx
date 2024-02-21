import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
export const server = 'http://localhost:9009/';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
