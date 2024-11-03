interface SingleNavLinkProps {
  title: string
  path: string
}

export const SingleNavLink = ({ title, path }: SingleNavLinkProps) => (
  <a
    href={path}
    className="flex h-10 items-center justify-between rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
  >
    {title}
  </a>
)