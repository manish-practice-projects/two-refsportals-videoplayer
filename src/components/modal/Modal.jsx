// components/Modal/Modal.jsx
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null)
  const previousFocus = useRef(null)

  // TOPIC: Refs for focus management and escape key handling
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousFocus.current = document.activeElement
      
      // TOPIC: Focus management with refs
      modalRef.current?.focus()
    } else {
      // Restore focus when modal closes
      previousFocus.current?.focus()
    }
  }, [isOpen])

  // TOPIC: Enhancing Modals with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // TOPIC: Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  // TOPIC: Rendering UI with Portals
  return ReactDOM.createPortal(
    <div 
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button 
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')
  )
}

export default Modal