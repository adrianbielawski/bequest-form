import React from 'react'
import './styles.css'
import classNames from 'classnames'

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  className?: string,
}

const Select = React.forwardRef<HTMLSelectElement, Props>(({ className, children, ...rest }, ref) => {
  const selectClass = classNames(
    'select',
    className,
  )
  return (
    <select
      className={selectClass}
      ref={ref}
      {...rest}
    >
      {children}
    </select>
  )
})

export default Select
