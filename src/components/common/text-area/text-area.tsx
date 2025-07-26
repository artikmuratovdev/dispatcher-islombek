import React from 'react'
import {cn} from '@/lib/utils'
import {TextAreaProps} from './types'

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  onClick,
  className = '',
  disabled = false,
  errorMessage,
  size = 'md',
  fullWidth = false,
  placeholder,
  inputSizeClassName,
  wrapperClassName,
}) => {
  let inputSizeClasses = ''
  switch (size) {
    case 'sm':
      inputSizeClasses = 'px-3 py-2 text-sm'
      break
    case 'md':
      inputSizeClasses = 'px-4 py-2 text-base'
      break
    case 'lg':
      inputSizeClasses = 'px-6 py-3 text-lg'
      break
    default:
      inputSizeClasses = 'px-4 py-2 text-base'
  }

  return (
    <label className={cn('flex flex-col', fullWidth && 'w-full', className)}>
      {label && (
        <span className="text-[#0b0b0b] text-base inline-block mb-2 font-normal font-['Inter Display']">{label}</span>
      )}
      <div
        className={cn(
          `relative flex border items-center border-[#c5c5c5] text-center text-[#0b0b0b] text-lg font-normal font-['Inter Display'] rounded-lg ${errorMessage ? 'border-red-500' : 'border-gray-300'}`,
          wrapperClassName,
        )}
      >
        <textarea
          value={value}
          onChange={onChange}
          disabled={disabled}
          onClick={onClick}
          placeholder={placeholder}
          className={cn(
            'w-full h-28 rounded-md text-[#0b0b0b] text-lg font-normal focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none',
            inputSizeClasses,
            inputSizeClassName,
          )}
        />
      </div>

      {errorMessage && <span className="text-red-500 text-xs mt-1">{errorMessage}</span>}
    </label>
  )
}
