import Button from '@/src/shared/ui/button/Button'
import LinkButton from '@/src/shared/ui/link-button/LinkButton'

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-neutral-700 border-b sm:px-6">
        <LinkButton href="/bots">Bots</LinkButton>
        <Button>United Logs</Button>
      </header>
    </>
  )
}
