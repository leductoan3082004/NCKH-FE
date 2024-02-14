import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  inputClassName?: string
  wrapperClassName?: string
  errorClassName?: string
  errorSection?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  name,
  register,
  className = 'bg-transparent',
  errorMessage,
  rules,
  children,
  errorSection,
  inputClassName = 'w-full rounded-sm border border-gray-300 p-3 outline-none outline',
  wrapperClassName = '',
  errorClassName = 'mt-1 min-h-[1.25rem] lg:min-h-[1.5rem] text-sm lg:text-base text-alertRed',

  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={wrapperClassName}>
      <div className={className}>
        {children}
        <input className={inputClassName} {...registerResult} {...rest} />
      </div>
      {errorSection}
      <div className={errorClassName}>{errorMessage}</div>
    </div>
  )
}
