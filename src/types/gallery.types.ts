export interface GalleryImage {
  title: string
  link: string
  coverPhoto: string
  description?: string
}

export interface GalleryGroup {
  groupTitle: string
  images: GalleryImage[]
}

export interface GalleryData {
  groups: GalleryGroup[]
}
