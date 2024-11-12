export const Footer = () => {
  const siteConfig = {
    title: 'Strona Parafialna',
    socialLinks: [
      { href: 'https://twitter.com/example', text: 'Twitter' },
      { href: 'https://github.com/example', text: 'GitHub' },
      { href: 'https://linkedin.com/in/example', text: 'LinkedIn' }
    ],
    footerNavLinks: [
      { href: '/about', text: 'About' },
      { href: '/blog', text: 'Blog' },
      { href: '/contact', text: 'Contact' },
      { href: '/privacy', text: 'Privacy Policy' }
    ]
  }
  const socialLinks = siteConfig.socialLinks || []
  const navLinks = siteConfig.footerNavLinks || []

  return (
    <footer className="mx-auto w-full max-w-3xl pb-10 pt-12 sm:pb-14 sm:pt-24">
      {navLinks.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              className="font-serif hover:underline hover:underline-offset-2"
              href={link.href}
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
      <div
        className={[
          'flex flex-col gap-4 border-t border-dashed border-foreground pt-6',
          socialLinks.length > 0 &&
            'sm:flex-row-reverse sm:items-center sm:justify-between'
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {socialLinks.map(link => (
              <a
                key={link.href}
                className="inline-flex items-center justify-center text-sm hover:underline hover:underline-offset-2"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
        <p className="text-sm">
          &copy; {new Date().getFullYear()}&nbsp;
          <a className="hover:underline hover:underline-offset-2" href="/">
            {siteConfig.title}
          </a>
          . Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
