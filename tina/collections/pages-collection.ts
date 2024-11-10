import type { Collection } from 'tinacms'

export const pagesCollection: Collection = {
  name: 'pages',
  label: 'Strony',
  path: 'content/pages',
  format: 'json',
  ui: {
    filename: {
      readonly: true,
      slugify: values => {
        return `${values?.slug?.toLowerCase().replace(/ /g, '-')}` || ''
      }
    }
  },
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
      name: 'slug',
      label: 'URL strony',
      required: true,
      description: "Np. '/o-nas' utworzy stronę '/o-nas'"
    },
    {
      type: 'string',
      name: 'description',
      label: 'Opis',
      ui: {
        component: 'textarea'
      }
    },
    {
      type: 'string',
      name: 'template',
      label: 'Szablon strony',
      options: [
        {
          label: 'Strona domowa',
          value: 'home'
        },
        {
          label: 'Strona standardowa',
          value: 'default'
        },
        {
          label: 'Strona kontaktowa',
          value: 'contact'
        }
      ],
      required: true
    },
    {
      type: 'rich-text',
      name: 'content',
      label: 'Treść',
      isBody: true
    },
    {
      type: 'boolean',
      name: 'isPublished',
      label: 'Opublikowany'
    },
    {
      type: 'datetime',
      name: 'createdAt',
      label: 'Data utworzenia',
      ui: {
        dateFormat: 'DD MMMM YYYY'
      }
    }
  ]
}
