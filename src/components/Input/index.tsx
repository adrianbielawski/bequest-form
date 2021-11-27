import React from 'react'
import './styles.css'
import classNames from 'classnames'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string,
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ className, ...rest }, ref) => {
  const inputClass = classNames(
    'input',
    className,
  )
  return (
    <input
      className={inputClass}
      ref={ref}
      {...rest}
    />
  )
})

export default Input
