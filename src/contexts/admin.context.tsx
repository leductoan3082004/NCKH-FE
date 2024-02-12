import { useState, createContext } from 'react'
import { Post } from 'src/types/post.type'

interface AdminContextInterface {
  currentPost: Post | null
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>
  categories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  updateCategories: string[]
  setUpdateCategories: React.Dispatch<React.SetStateAction<string[]>>
  updateTags: string[]
  setUpdateTags: React.Dispatch<React.SetStateAction<string[]>>
}

const initialAdminContext: AdminContextInterface = {
  currentPost: null,
  setCurrentPost: () => null,
  categories: [],
  setCategories: () => null,
  tags: [],
  setTags: () => null,
  updateCategories: [],
  setUpdateCategories: () => null,
  updateTags: [],
  setUpdateTags: () => null
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPost, setCurrentPost] = useState<Post | null>(initialAdminContext.currentPost)
  const [categories, setCategories] = useState<string[]>(initialAdminContext.categories)
  const [tags, setTags] = useState<string[]>(initialAdminContext.tags)
  const [updateCategories, setUpdateCategories] = useState<string[]>(initialAdminContext.categories)
  const [updateTags, setUpdateTags] = useState<string[]>(initialAdminContext.tags)

  return (
    <AdminContext.Provider
      value={{
        currentPost,
        setCurrentPost,
        categories,
        setCategories,
        tags,
        setTags,
        updateCategories,
        setUpdateCategories,
        updateTags,
        setUpdateTags
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
