import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
export interface AlgorithmRunStateViewProps {
  state: object
  className?: string
}

export default function AlgorithmRunStateView({ state, className = '' }: AlgorithmRunStateViewProps) {
  const jsonValue = JSON.stringify(state, null, 2)

  const [style, setStyle] = useState({})
  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism/one-dark').then((mod) => setStyle(mod.default))
  }, [])

  return (
    <div className={`${className} max-w-full`}>
      <SyntaxHighlighter language="json" style={style}>
        {jsonValue}
      </SyntaxHighlighter>
    </div>
  )
}
