import type { Collection } from 'tinacms'

export const albumsCollection: Collection = {
  name: 'albums',
  label: 'Albumy',
  path: 'content/albums',
  format: 'json',
  ui: {
    filename: {
      readonly: true,
      slugify: (data: any) =>
        `${data?.title?.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    }
  },
  fields: [
    {
      type: 'string',
      name: 'groupName',
      label: 'Nazwa Grupy',
      required: true,
      isTitle: true
    },
    {
      type: 'object',
      name: 'albums',
      label: 'Albumy',
      required: true,
      list: true,
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Nazwa Albumu',
          required: true,
          isTitle: true
        },
        {
          type: 'string',
          name: 'description',
          label: 'Opis Albumu',
          ui: {
            component: 'textarea'
          }
        },
        {
          type: 'object',
          name: 'images',
          label: 'Zdjęcia',
          list: true,
          ui: {
            itemProps: item => ({
              label: item.title || 'Nowe zdjęcie'
            })
          },
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Tytuł Zdjęcia'
            },
            {
              type: 'image',
              name: 'src',
              label: 'Zdjęcie',
              required: true
            },
            {
              type: 'string',
              name: 'alt',
              label: 'Tekst alternatywny'
            },
            {
              type: 'string',
              name: 'description',
              label: 'Opis Zdjęcia',
              ui: {
                component: 'textarea'
              }
            }
          ]
        }
      ]
    }
  ]
}
