import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UseContext from './context/UseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UseContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UseContext>
  </StrictMode>,
)