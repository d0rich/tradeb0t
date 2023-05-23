import Link, { LinkProps } from 'next/link'

export interface LinkButtonProps extends LinkProps {
  children: React.ReactNode
}

export default function LinkButton(props: LinkButtonProps) {
  return (
    <>
      <Link {...props} />
    </>
  )
}
