import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import Navbar from './pages/Nav.jsx'
import Last from './pages/Footer.jsx'
import {AuthProvider} from './structure/GlobalStateProvider.jsx'
import { oauth_client_id } from '../config.js'
import { GoogleOAuthProvider } from '@react-oauth/google';


// import { connect } from 'react-redux';
// import { Provider } from 'react-redux'
// import {store} from './Redux/store'


// import { AuthProvider } from './structure/AuthWrapper.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId={oauth_client_id}>
      <BrowserRouter>
        <SnackbarProvider>
          <AuthProvider>
          {/* <Provider store={store}> */}
            <Navbar/>
            <main><App /></main>
            <Last/>
          </AuthProvider>
          {/* </Provider> */}
        </SnackbarProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
    // </React.StrictMode>
)
