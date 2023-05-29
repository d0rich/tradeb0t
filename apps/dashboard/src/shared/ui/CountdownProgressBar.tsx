import { useEffect, useState, CSSProperties } from 'react'

import './CountdownProgressBar.css'

export interface CountdownProgressBarProps {
  className?: string
  duration?: number
}

export default function CountdownProgressBar({ className = '', duration = 10000 }: CountdownProgressBarProps) {
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProgressValue(100)
    }, 10)
  }, [duration])

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
