import type { Collection } from 'tinacms'

export const pageCollection: Collection = {
  name: 'page',
  label: 'Strony',
  path: 'content/page',
  format: 'mdx',
  ui: {
    filename: {
      readonly: true,
      slugify: data => data?.slug?.toLowerCase().replace(/\s+/g, '-')
    },
    router: ({ document }) => {
      return `/page/${document?._sys.filename}`
    }
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true
    },
    {
      type: 'boolean',
      name: 'isPublished',
      label: 'Opublikuj'
    },
    {
      type: 'boolean',
      name: 'showTitle',
      label: 'Show title'
    },
    {
      type: 'string',
      name: 'slug',
      label: 'Slug',
      required: true,
      ui: {
        description: 'Preferowana wartość to "slug" w języku angielskim',
        format: value => value?.toLowerCase().replace(/\s+/g, '-') || ''
      }
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
      templates: [
        {
          name: 'Accordion',
          label: 'Accordion',
          fields: [
            {
              type: 'string',
              name: 'type',
              label: 'Type',
              required: true,
              options: ['multiple', 'single']
            },
            {
              type: 'object',
              name: 'options',
              label: 'Options',
              list: true,
              ui: {
                itemProps: (item: any) => {
                  return {
                    label: item?.title
                  }
                },
                defaultItem: () => {
                  return {
                    uniqueId: crypto.randomUUID()
                  }
                }
              },
              fields: [
                {
                  type: 'string',
                  name: 'uniqueId',
                  label: 'Unique ID',
                  ui: {
                    component: () => null
                  }
                },
                {
                  type: 'string',
                  name: 'title',
                  label: 'Title'
                },
                {
                  type: 'rich-text',
                  name: 'body',
                  label: 'Body',
                  isBody: true
                }
              ]
            }
          ]
        },
        {
          name: 'TabsView',
          label: 'Tabs View',
          fields: [
            {
              type: 'object',
              name: 'groups',
              label: 'Groups',
              ui: {
                defaultItem: () => {
                  return {
                    tabId: crypto.randomUUID()
                  }
                },
                itemProps: (item: any) => {
                  return {
                    label: item?.tabTitle
                  }
                }
              },
              list: true,
              fields: [
                {
                  type: 'string',
                  name: 'tabId',
                  label: 'Tab ID'
                },
                {
                  type: 'string',
                  name: 'tabTitle',
                  label: 'Tab Title'
                },
                {
                  type: 'rich-text',
                  name: 'tabContent',
                  label: 'Tab Content',
                  isBody: true
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
