import type { Collection } from 'tinacms'

const POLISH_DAYS = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela'
]

const nextMonday = () => {
  const today = new Date()
  const nextMonday = new Date(today)
  nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
  return nextMonday.toISOString()
}

export const intentionsCollection: Collection = {
  name: 'intentions',
  label: 'Intencje',
  path: 'content/intentions',
  format: 'json',
  defaultItem: {
    title: 'Intencje parafialne',
    startDate: nextMonday(),
    days: [
      {
        day: '0',
        intentions: [{ hour: '09:00', intention: 'Treść intencji' }]
      },
      {
        day: '1',
        intentions: [{ hour: '10:00', intention: 'Treść intencji' }]
      },
      {
        day: '2',
        intentions: [{ hour: '11:00', intention: 'Treść intencji' }]
      },
      {
        day: '3',
        intentions: [{ hour: '12:00', intention: 'Treść intencji' }]
      },
      {
        day: '4',
        intentions: [{ hour: '13:00', intention: 'Treść intencji' }]
      },
      {
        day: '5',
        intentions: [{ hour: '14:00', intention: 'Treść intencji' }]
      },
      {
        day: '6',
        intentions: [{ hour: '15:00', intention: 'Treść intencji' }]
      }
    ]
  },
  ui: {
    filename: {
      readonly: true,
      slugify: (data: any) =>
        `${data?.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    }
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł',
      type: 'string',
      required: true,
      isTitle: true
    },
    {
      name: 'startDate',
      label: 'Data rozpoczęcia',
      type: 'datetime',
      required: true
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'string'
    },
    {
      name: 'days',
      label: 'Dni',
      type: 'object',
      list: true,
      ui: {
        itemProps: item => {
          return {
            label: POLISH_DAYS[item.day] || 'Nieznany dzień'
          }
        }
      },
      fields: [
        {
          name: 'day',
          type: 'string',
          label: 'Dzień Tygodnia',
          required: true,
          options: Array.from({ length: 7 }, (_, i) => i).map(day => ({
            label: POLISH_DAYS[day],
            value: day.toString()
          }))
        },
        {
          name: 'intentions',
          label: 'Intencje',
          type: 'object',
          list: true,
          ui: {
            itemProps: item => {
              return {
                label: item.hour || 'Nowa intencja'
              }
            }
          },
          fields: [
            {
              name: 'hour',
              label: 'Godzina',
              type: 'string',
              required: true
            },
            {
              name: 'intention',
              label: 'Intencja',
              type: 'rich-text',
              required: true
            }
          ]
        }
      ]
    }
  ]
}
