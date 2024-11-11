import client from '@/tina/client'
import type { Maybe, GalleryGroups, GalleryGroupsImages } from '@/tina/types'

const isNotNull = <T>(item: T): item is NonNullable<T> =>
  item !== null && item !== undefined

export const getGallery = async (): Promise<GalleryData> => {
  const gallery = await client.queries.galleryConnection({
    filter: { groups: { isEnabled: { eq: true } } }
  })

  const galleryData = gallery.data.galleryConnection.edges?.[0]?.node

  if (!galleryData) {
    return { groups: [] }
  }

  const groups = galleryData.groups
    ?.map(group => getParsedGroup(group))
    .filter(isNotNull) ?? []

  return { groups }
}

const getParsedGroup = (group: Maybe<GalleryGroups>): GalleryGroup | null => {
  if (!group?.groupTitle || !group.isEnabled) return null

  const images = group.images
    ?.map(image => getParsedImage(image))
    .filter(isNotNull) ?? []

  if (images.length === 0) return null

  return {
    groupTitle: group.groupTitle,
    images
  }
}

const getParsedImage = (image: Maybe<GalleryGroupsImages>): GalleryImage | null => {
  if (!image?.title || !image.isEnabled || !image.link || !image.coverPhoto) {
    return null
  }

  return {
    title: image.title,
    link: image.link,
    coverPhoto: image.coverPhoto,
    description: image.description ?? undefined
  }
}