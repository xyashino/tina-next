type NavigationLink = {
  title: string
  path: string
  description?: string
}

type NavigationGroup = {
  title: string
  links: NavigationLink[]
}

type ContactEntry = {
  label: string
  value: string
  description: string
}

type SiteConfig = {
  title: string
  subtitle?: string
  logo?: {
    src: string
    alt: string
  }
  socialLinks?: {
    text: string
    href: string
  }[]
  footerNavLinks?: {
    text: string
    href: string
  }[]
  hero?: {
    title?: string
    text?: string
    image?: {
      src: string
      alt: string
      caption?: string
    }
    actions?: {
      text: string
      href: string
    }[]
  }
}