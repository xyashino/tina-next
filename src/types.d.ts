type NavigationLink = {
  type: 'link'
  title: string
  link: string
}

type NavigationGroup = {
  type: 'group'
  title: string
  items: Array<{ title: string; link: string }>
}

type NavigationItem = NavigationLink | NavigationGroup

type NavigationItems = NavigationItem[]