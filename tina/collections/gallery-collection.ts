import { type Collection } from 'tinacms'

interface AlbumItem {
  albumTitle: string
  [key: string]: any
}

interface ImageItem {
  caption?: string
  [key: string]: any
}

export const galleryCollection: Collection = {
  name: 'gallery',
  label: 'Galeria',
  path: 'content/gallery',
  format: 'json',
  ui: {
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      type: 'object',
      name: 'groups',
      label: 'Grupy',
      list: true,
      ui: {
        itemProps: (item: AlbumItem) => ({
          label: item.groupTitle
        })
      },
      fields: [
        {
          type: 'string',
          name: 'groupTitle',
          label: 'Nazwa grupy',
          required: true,
          isTitle: true
        },
        {
          type: 'boolean',
          name: 'isEnabled',
          label: 'Aktywny'
        },
        {
          type: 'object',
          name: 'images',
          label: 'Albumy',
          list: true,
          ui: {
            itemProps: (item: AlbumItem) => ({
              label: item.title
            })
          },
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Nazwa albumu',
              required: true
            },
            {
              type: 'boolean',
              name: 'isEnabled',
              label: 'Aktywny'
            },
            {
              type: 'string',
              name: 'link',
              label: 'Link',
              required: true
            },
            {
              type: 'image',
              name: 'coverPhoto',
              label: 'Zdjęcie główne'
            },
            {
              type: 'string',
              name: 'description',
              label: 'Opis'
            }
          ]
        }
      ]
    }
  ]
}
