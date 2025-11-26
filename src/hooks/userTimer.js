// hooks/useTimer.js
import { useRef, useCallback } from 'react'

// TOPIC: Using refs to store mutable values in custom hooks
export const useTimer = () => {
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const elapsedTimeRef = useRef(0)

  const start = useCallback(() => {
    if (timerRef.current) return // Already running
    
    startTimeRef.current = Date.now() - elapsedTimeRef.current
    
    timerRef.current = setInterval(() => {
      elapsedTimeRef.current = Date.now() - startTimeRef.current
    }, 10)
  }, [])

  const pause = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    pause()
    elapsedTimeRef.current = 0
    startTimeRef.current = null
  }, [pause])

  const getElapsedTime = useCallback(() => {
    return elapsedTimeRef.current
  }, [])

  return {
    start,
    pause,
    reset,
    getElapsedTime
  }
}