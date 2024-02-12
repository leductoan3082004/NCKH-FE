import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from 'src/App'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context'
import { AdminProvider } from './contexts/admin.context'
import ScrollToTop from './ScrollToTop'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
)
