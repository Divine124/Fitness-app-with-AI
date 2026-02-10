import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { Provider } from 'react-redux'
import { store } from './store/store'

import App from './App'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './authConfig'

import './index.css'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#14b8a6' },
    secondary: { main: '#f59e0b' },
    background: { default: '#0f172a', paper: '#1e293b' },
  },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
  },
  shape: { borderRadius: 12 },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider authConfig={authConfig}
                  loadingComponent={<div style={{ padding: 24, textAlign: 'center' }}>Loading…</div>}>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </ThemeProvider>,
)