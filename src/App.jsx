import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AppRootLayout from './pages/AppRoot'
import Dashboard from './pages/Dashboard'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ThemeProvider } from '@mui/material'
import theme from './util/theme.js'
import WalletProvider from './util/WalletProvider.jsx'
import RpcProvider from './util/RpcProvider.jsx'
import queryClient from './util/queryClient.js'
import { HelmetProvider } from 'react-helmet-async'
import Wrapper from './Wrapper.jsx'

const HomeRootLayout = React.lazy(() => import('./pages/HomeRoot.jsx'))
const Markets = React.lazy(() => import('./pages/Markets.jsx'))
const HomePage = React.lazy(() => import('./pages/HomePage.jsx'))
const Vote = React.lazy(() => import('./pages/Vote.jsx'))
const Liquidations = React.lazy(() => import('./pages/Liquidations.jsx'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RpcProvider>
            <Router>
              <WalletProvider>
                <Suspense
                  fallback={
                    <div className="loader-animation">
                      <div className="dot-windmill"></div>
                    </div>
                  }
                >
                  <Wrapper>
                    <Routes>
                      <Route path="/" element={<HomeRootLayout />}>
                        <Route index element={<HomePage />} />
                      </Route>
                      <Route path="/app" element={<AppRootLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="analytics" element={<Markets />} />
                        <Route path="vote" element={<Vote />} />
                        {/* <Route path="liquidation" element={<Liquidations />} /> */}
                      </Route>
                      <Route path="*" element={<AppRootLayout />} />
                    </Routes>
                  </Wrapper>
                </Suspense>
              </WalletProvider>
            </Router>
          </RpcProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}

export default App
