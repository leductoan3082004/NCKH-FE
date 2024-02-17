import { omit } from 'lodash'
import { useState, createContext } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import mainPath from 'src/constants/path'
import usePostListQueryConfig from 'src/hooks/usePostListQueryConfig'
import { getAccessTokenFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingPage: boolean
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  getPostListByTag: (tag: string) => void
  getPostListByCategory: (tag: string) => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  loadingPage: false,
  setLoadingPage: () => null,
  getPostListByTag: () => null,
  getPostListByCategory: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [loadingPage, setLoadingPage] = useState<boolean>(initialAppContext.loadingPage)

  //! HANDLE GET POSTLIST
  const navigate = useNavigate()
  const postListConfig = usePostListQueryConfig()

  const getPostListByTag = (tag: string) => {
    if (tag == '') {
      navigate({
        pathname: mainPath.posts,
        search: createSearchParams(
          omit(
            {
              ...postListConfig
            },
            ['page', 'limit', 'tag']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: mainPath.posts,
        search: createSearchParams(
          omit(
            {
              ...postListConfig,
              tag: tag
            },
            ['page', 'limit']
          )
        ).toString()
      })
    }
  }

  const getPostListByCategory = (category: string) => {
    if (category == '') {
      navigate({
        pathname: mainPath.posts,
        search: createSearchParams(
          omit(
            {
              ...postListConfig
            },
            ['page', 'limit', 'category']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: mainPath.posts,
        search: createSearchParams(
          omit(
            {
              ...postListConfig,
              category: category
            },
            ['page', 'limit']
          )
        ).toString()
      })
    }
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loadingPage,
        setLoadingPage,
        getPostListByTag,
        getPostListByCategory
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
