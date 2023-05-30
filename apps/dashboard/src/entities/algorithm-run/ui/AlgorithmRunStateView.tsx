import { useEffect, useState } from 'react'
import type { AlgorithmRun } from '@tradeb0t/core'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
export interface AlgorithmRunStateViewProps {
  state: AlgorithmRun['state']
  className?: string
}

export default function AlgorithmRunStateView({ state, className = '' }: AlgorithmRunStateViewProps) {
  const jsonValue = JSON.stringify(state, null, 2)

  const [style, setStyle] = useState({})
  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism/one-dark').then((mod) => setStyle(mod.default))
  }, [])

  return (
    <SyntaxHighlighter language="json" style={style}>
      {jsonValue}
    </SyntaxHighlighter>
  )
}
