import React from 'react'
import {cn} from '@/lib/utils'
import {SelectProps} from './types'
import {SelectContent, SelectItem, SelectTrigger, Select as SelectUI, SelectValue} from '@/components/ui/select'

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className = '',
  disabled = false,
  errorMessage,
  size = 'md',
  fullWidth = false,
  wrapperClassName,
  placeholder,
  selectClassName,
}) => {
  let selectSizeClasses = ''

  switch (size) {
    case 'sm':
      selectSizeClasses = 'px-3 py-2 text-sm'
      break
    case 'md':
      selectSizeClasses = 'px-4 py-2 text-base'
      break
    case 'lg':
      selectSizeClasses = 'px-6 py-3 text-lg'
      break
    default:
      selectSizeClasses = 'px-4 py-2 text-base'
  }

  return (
    <label className={cn('flex flex-col', fullWidth && 'w-full', className)}>
      {label && (
        <span className="text-[#0b0b0b] text-base inline-block mb-2 font-normal font-['Inter Display']">{label}</span>
      )}
      <div
        className={cn(
          `relative flex h-14 overflow-hidden items-center border border-[#c5c5c5] text-center text-[#0b0b0b] text-lg font-normal font-['Inter Display'] rounded-lg ${errorMessage ? 'border-red-500' : 'border-gray-300'}`,
          wrapperClassName,
        )}
      >
        <SelectUI disabled={disabled} onValueChange={onChange} defaultValue={value}>
          <SelectTrigger
            value={value}
            defaultValue={value}
            className={cn(
              'w-full h-full bg-white border-none rounded-md text-[#0b0b0b] focus:outline-none focus:ring-2 focus:ring-blue-300',
              selectSizeClasses,
              selectClassName,
            )}
          >
            <SelectValue
              className="placeholder:text-[#737373]"
              placeholder={<span className="text-[#737373]">{placeholder || 'Select'}</span>}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectUI>
      </div>

      {errorMessage && <span className="text-red-500 text-xs mt-1">{errorMessage}</span>}
    </label>
  )
}
