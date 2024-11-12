import { ReferenceField, TextField, type Collection } from 'tinacms'
import { LinkType } from '../../src/enum/link-type.enum'

const getElementType = (props: any, num: number) => {
  const currentField = props.field.name.split('.').slice(0, num)
  const formValues = props.form.getState().values
  let selectedValue = formValues

  for (let i = 0; i < num; i++) {
    selectedValue = selectedValue[currentField[i]]
  }

  return selectedValue.type
}

export const navigationCollection: Collection = {
  name: 'navigation',
  label: 'Nawigacja',
  path: 'content/navigation',
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
        defaultItem: {
          isEnabled: true
        },
        itemProps: item => {
          const linksLength = item?.links?.length || 0
          if (linksLength === 0) {
            return {
              label: `Nowa Grupa/Link`
            }
          }
          const isLink = item?.links?.length === 1
          return {
            label: `(${isLink ? 'Link' : 'Grupa'}) - ${item?.label}`
          }
        }
      },
      fields: [
        {
          type: 'string',
          name: 'label',
          label: 'Nazwa grupy'
        },
        {
          type: 'boolean',
          name: 'isEnabled',
          label: 'Aktywny'
        },
        {
          type: 'object',
          name: 'links',
          label: 'Podstrony',
          description:
            'Gdy będzie tylko jedna podstrona, to grupa będzie renderowana jako link.',
          list: true,
          ui: {
            defaultItem: {
              type: LinkType.PAGE
            },
            itemProps: item => {
              return {
                label: item?.name
              }
            }
          },
          fields: [
            {
              type: 'string',
              name: 'type',
              label: 'Typ linku',
              options: [
                {
                  label: 'Strona',
                  value: LinkType.PAGE
                },
                {
                  label: 'URL zewnętrzny',
                  value: LinkType.EXTERNAL
                }
              ]
            },
            {
              type: 'string',
              name: 'name',
              label: 'Nazwa linku'
            },
            {
              type: 'reference',
              name: 'page',
              label: 'Strona',
              collections: ['page'],
              ui: {
                component: (props: any) => {
                  const selectedValue = getElementType(props, 4)
                  if (selectedValue === LinkType.EXTERNAL) {
                    return null
                  }
                  return ReferenceField(props)
                }
              }
            },
            {
              type: 'string',
              name: 'externalUrl',
              label: 'URL zewnętrzny',
              ui: {
                component: (props: any) => {
                  const selectedValue = getElementType(props, 4)
                  if (selectedValue === LinkType.PAGE) {
                    return null
                  }
                  return TextField(props)
                }
              }
            },
            {
              type: 'string',
              name: 'description',
              label: 'Opis linku',
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
