// components/CustomInput/CustomInput.jsx
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import './CustomInput.css'

// TOPIC: Forwarding refs to custom components
const CustomInput = forwardRef(({ placeholder, onEnter, ...props }, ref) => {
  const inputRef = useRef(null)

  // TOPIC: Exposing limited API to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    getValue: () => inputRef.current?.value || ''
  }))

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(e.target.value)
    }
  }

  return (
    <div className="custom-input-wrapper">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        className="custom-input"
        {...props}
      />
      <span className="input-hint">Press Enter to submit</span>
    </div>
  )
})

CustomInput.displayName = 'CustomInput'

export default CustomInput