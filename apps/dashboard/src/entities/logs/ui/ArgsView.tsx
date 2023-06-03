import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'

export interface ArgsViewProps {
  args: unknown[]
}

export default function ArgsView({ args }: ArgsViewProps) {
  return (
    <>
      {args.map((arg, index) => {
        if (typeof arg === 'object') {
          return <ArgJSON key={index} arg={arg!} />
        }
        if (typeof arg === 'string' || typeof arg === 'number') {
          return <code key={index}>{arg}</code>
        }
      })}
    </>
  )
}

function ArgJSON({ arg }: { arg: object }) {
  const html = hljs.highlight(JSON.stringify(arg), {
    language: 'json'
  })

  return <code dangerouslySetInnerHTML={{ __html: html.value }} />
}
