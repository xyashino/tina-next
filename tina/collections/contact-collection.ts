import type { Collection } from 'tinacms'

export const contactCollection: Collection = {
  name: 'contact',
  label: 'Kontakt',
  path: 'content/contact',
  format: 'json',
  ui: {
    filename: {
      readonly: true,
      slugify: () => 'contact'
    },
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł',
      type: 'string',
      required: true
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'string'
    },
    {
      name: 'googleMapsUrl',
      label: 'Google Maps URL',
      type: 'string',
      required: true
    },
    {
      name: 'contactItems',
      label: 'Elementy kontaktu',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item: any) => ({
          label: item?.label || 'Nowy element kontaktu'
        })
      },
      fields: [
        {
          name: 'label',
          label: 'Etykieta',
          type: 'string',
          required: true
        },
        {
          name: 'description',
          label: 'Opis',
          type: 'string'
        },
        {
          name: 'value',
          label: 'Wartość',
          type: 'string'
        }
      ]
    }
  ]
}
