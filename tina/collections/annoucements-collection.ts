import type { Collection } from 'tinacms'
import { getNextDay } from '../utils'

export const anoucementsCollection: Collection = {
  label: 'Ogłoszenia',
  name: 'announcements',
  path: 'announcements',
  ui: {
    filename: {
      readonly: true,
      slugify: data => data?.title?.toLowerCase().replace(/\s+/g, '-')
    }
  },
  defaultItem: {
    date: getNextDay(0)
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Tytuł',
      isTitle: true,
      required: true
    },
    {
      type: 'string',
      name: 'description',
      label: 'Opis'
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Data',
      ui: {
        description:
          'Ustaw datę, aby ogłoszenie było widoczne na stronie. Musi być to poniedziałek danego tygodnia.'
      }
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Treść'
    }
  ]
}
