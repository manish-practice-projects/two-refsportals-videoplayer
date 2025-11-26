// components/Tooltip/Tooltip.jsx
import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import './Tooltip.css'

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef(null)

  const handleMouseEnter = () => {
    // TOPIC: Measuring elements with refs
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      })
    }
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  const tooltipContent = isVisible && (
    // TOPIC: Portals for tooltips to avoid z-index issues
    ReactDOM.createPortal(
      <div 
        className="tooltip"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translateX(-50%)'
        }}
      >
        {text}
        <div className="tooltip-arrow" />
      </div>,
      document.getElementById('portal-root')
    )
  )

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="tooltip-trigger"
      >
        {children}
      </span>
      {tooltipContent}
    </>
  )
}

export default Tooltip