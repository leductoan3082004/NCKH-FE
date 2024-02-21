import { useState, createContext } from 'react'
import { getAccessTokenFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingPage: boolean
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  loadingPage: false,
  setLoadingPage: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [loadingPage, setLoadingPage] = useState<boolean>(initialAppContext.loadingPage)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loadingPage,
        setLoadingPage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
