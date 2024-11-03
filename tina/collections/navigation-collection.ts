import type { Collection, TinaField } from 'tinacms'

const linkField: TinaField = {
  type: 'object',
  name: 'links',
  label: 'Linki',
  list: true,
  ui: {
    itemProps: item => ({
      label: item?.title || 'Nowy link'
    })
  },
  indexed: true,
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Tytuł',
      required: true,
      isTitle: true
    },
    {
      type: 'string',
      name: 'path',
      label: 'URL',
      required: true
    },
    {
      type: 'string',
      name: 'description',
      label: 'Opis'
    }
  ]
}

const groupField: TinaField = {
  type: 'object',
  name: 'groups',
  label: 'Grupy',
  list: true,
  ui: {
    itemProps: item => ({
      label: item?.title || 'Nowa grupa'
    })
  },
  indexed: true,
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Tytuł',
      required: true,
      isTitle: true
    },
    linkField
  ]
}

export const navigationCollection: Collection = {
  name: 'navigation',
  label: 'Nawigacja',
  path: 'content/navigation',
  format: 'json',
  ui: {
    filename: {
      readonly: true,
      slugify: () => 'navigation'
    },
    allowedActions: {
      create: false,
      delete: false
    }
  },
  fields: [groupField]
}
