import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './app.css'
import { WorkoutsContextProvider } from './context/WorkoutsContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthContextProvider>
        <WorkoutsContextProvider>
          <App />
        </WorkoutsContextProvider>
      </AuthContextProvider>
    </StrictMode>,
)
