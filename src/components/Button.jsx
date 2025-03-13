import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out ${textColor} ${bgColor} ${className}`} {...props}>{children}</button>
  )
}

export default Button
