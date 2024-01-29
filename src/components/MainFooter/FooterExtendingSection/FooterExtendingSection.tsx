import React from 'react'

interface Props {
  title: string
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FooterExtendingSection({ title, children }: Props) {
  return <div>FooterExtendingSection</div>
}
