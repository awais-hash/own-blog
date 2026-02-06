import React from 'react'

const Button = ({
    children,
    bg = 'bg-blue-500',
    color = 'text-white',
    className = '',
    ...props
}) => {
  return (
  <button
    className={`px-4 py-2 rounded ${bg} ${color} ${className}`}
    {...props}
  >
    {children}
  </button>
  )
}

export default Button
