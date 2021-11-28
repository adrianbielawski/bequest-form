import React from 'react'
import './styles.css'
import classNames from 'classnames'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string,
  indicateRequired?: boolean
}

const Input = React.forwardRef<HTMLInputElement, Props>(({
  className,
  required,
  indicateRequired,
  ...rest
}, ref) => {
  const inputClass = classNames(
    'input',
    className,
    {
      required: indicateRequired,
    },
  )

  return (
    <div className='input-wrapper'>
      {(required && indicateRequired) && (
        <span className='required-symbol'>*</span>
      )}
      <input
        className={inputClass}
        ref={ref}
        {...rest}
      />
    </div>
  )
})

export default Input
