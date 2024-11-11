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

type IntentionsDay = {
  day: string
  date: string | null | undefined
  intentions: {
    hour: string
    intention: any
  }[]
}

interface GalleryImage {
  title: string
  link: string
  coverPhoto: string
  description?: string
}

interface GalleryGroup {
  groupTitle: string
  images: GalleryImage[]
}

interface GalleryData {
  groups: GalleryGroup[]
}