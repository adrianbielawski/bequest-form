import React from 'react'
import './styles.css'
import classNames from 'classnames'

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  className?: string,
  indicateRequired?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, Props>(({
  className,
  children,
  required,
  indicateRequired,
  ...rest
}, ref) => {
  const selectClass = classNames(
    'select',
    className,
    {
      required: indicateRequired,
    },
  )
  return (
    <div className='select-wrapper'>
      {(required && indicateRequired) && (
        <span className='required-symbol'>*</span>
      )}
      <select
        className={selectClass}
        ref={ref}
        required
        {...rest}
      >
        {children}
      </select>
    </div>
  )
})

export default Select
