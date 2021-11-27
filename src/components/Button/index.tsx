import React from 'react'
import './styles.css'
import classNames from 'classnames'

interface Props extends React.InputHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'reset' | 'submit'
  className?: string,
}

const Button = React.forwardRef<HTMLButtonElement, Props>(({
  type,
  className,
  children,
  ...rest
}, ref) => {
  const inputClass = classNames(
    'button',
    className,
  )

  return (
    <button
      type={type}
      className={inputClass}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button
