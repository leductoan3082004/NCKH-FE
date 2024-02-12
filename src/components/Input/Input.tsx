import { Fragment, InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
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
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none outline',
  classNameError = 'mt-1 min-h-[1.25rem] lg:min-h-[1.5rem] text-sm lg:text-base text-red-600',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <Fragment>
      <div className={classNameError} />
      <div className={className}>
        <input className={classNameInput} {...registerResult} {...rest} />
      </div>
      <div className={classNameError}>{errorMessage}</div>
    </Fragment>
  )
}
