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
  label: 'Gallery',
  path: 'content/gallery',
  format: 'mdx',
  ui: {
    router: ({ document }: { document: any }) => {
      return `/gallery/${document._sys.filename}`
    }
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Group Title',
      required: true
    },
    {
      type: 'object',
      name: 'albums',
      label: 'Albums',
      list: true,
      ui: {
        itemProps: (item: AlbumItem) => ({
          label: item.albumTitle
        })
      },
      fields: [
        {
          type: 'string',
          name: 'albumTitle',
          label: 'Album Title',
          required: true
        },
        {
          type: 'string',
          name: 'description',
          label: 'Album Description',
          ui: {
            component: 'textarea'
          }
        },
        {
          type: 'object',
          name: 'images',
          label: 'Images',
          list: true,
          ui: {
            itemProps: (item: ImageItem) => ({
              label: item.caption || 'Image'
            })
          },
          fields: [
            {
              type: 'image',
              name: 'src',
              label: 'Image',
              required: true
            },
            {
              type: 'string',
              name: 'caption',
              label: 'Caption'
            },
            {
              type: 'string',
              name: 'alt',
              label: 'Alt Text',
              required: true
            }
          ]
        }
      ]
    }
  ]
}
