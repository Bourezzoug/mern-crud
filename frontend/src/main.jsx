import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './app.css'
import { WorkoutsContextProvider } from './context/WorkoutsContext.jsx'


createRoot(document.getElementById('root')).render(
    <StrictMode>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </StrictMode>,
)
