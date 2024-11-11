import type { Collection } from 'tinacms'
import { getNextDay } from '../utils'

const POLISH_DAYS = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela'
]


const INITIAL_INTENTIONS = Array.from({ length: 7 }, (_, i) => i).map(day => ({
  day: day.toString(),
  date: getNextDay(day),
  intentions: [{ hour: '09:00', intention: '' }]
}))

const INITIAL_INTENTIONS = Array.from({ length: 7 }, (_, i) => i).map(day => ({
  day: day.toString(),
  date: getNextDay(day),
  intentions: [{ hour: '09:00', intention: '' }]
}))

export const intentionsCollection: Collection = {
  name: 'intentions',
  label: 'Intencje',
  path: 'content/intentions',
  format: 'json',
  defaultItem: {
    title: 'Intencje parafialne',
    startDate: getNextDay(0),
    days: INITIAL_INTENTIONS,
    isActive: true
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
      name: 'isActive',
      label: 'Aktywny',
      type: 'boolean',
      required: true
    },
    {
      name: 'startDate',
      label: 'Data rozpoczęcia',
      type: 'datetime',
      required: true,
      searchable: true
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
          isTitle: true,
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
