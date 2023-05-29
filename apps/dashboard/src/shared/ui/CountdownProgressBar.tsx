import { useEffect, useState, CSSProperties } from 'react'
import { flushSync } from 'react-dom'

import './CountdownProgressBar.css'

export interface CountdownProgressBarProps {
  className?: string
  duration?: number
}

export default function CountdownProgressBar({ className = '', duration = 10000 }: CountdownProgressBarProps) {
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    flushSync(() => {
      setProgressValue(100)
    })
  }, [])

  return (
    <progress
      className={`countdown-progress progress ${className}`}
      style={
        {
          '--countdown-progress-duration': `${duration}ms`
        } as CSSProperties
      }
      value={progressValue}
      max="100"
    ></progress>
  )
}
