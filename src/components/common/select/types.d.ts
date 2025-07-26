import React from 'react'

export interface Option {
  label: string
  value: string | number
}

export interface SelectProps {
  label?: string
  value: string
  onChange: (event: string) => void
  options: Option[]
  className?: string
  disabled?: boolean
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  placeholder?: string
  wrapperClassName?: string
  placeholder?: string
  selectClassName?: string
  selectClass?: string
}
