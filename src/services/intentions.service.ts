import client from '@/tina/client'
import type {
  IntentionsDays,
  IntentionsDaysIntentions,
  Maybe
} from '@/tina/types'

const isNotNull = <T>(item: T): item is NonNullable<T> =>
  item !== null && item !== undefined

const POLISH_DAYS = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela'
]

const getCurrentMonday = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(today)
  monday.setDate(today.getDate() - diff)
  monday.setHours(-1, 0, 0, 0)
  return monday.toISOString()
}

const getNextMonday = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const diff = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
  const nextMonday = new Date(today)
  nextMonday.setDate(today.getDate() + diff)
  nextMonday.setHours(-1, 0, 0, 0)
  return nextMonday.toISOString()
}

const getDayOfWeek = (dayIndex: number) => {
  const monday = new Date(getCurrentMonday())
  const date = new Date(monday)
  date.setDate(monday.getDate() + dayIndex)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

export const getActiveIntentions = async () => {
  const intentions = await client.queries.intentionsConnection({
    filter: {
      isActive: {
        eq: true
      },
      startDate: {
        after: getCurrentMonday(),
        before: getNextMonday()
      }
    },
    sort: 'startDate_DESC'
  })
  const intentionsData = intentions.data.intentionsConnection.edges?.[0]?.node

  console.log({
    currentMonday: getCurrentMonday(),
    nextMonday: getNextMonday()
  })

  const result = {
    title: intentionsData?.title || 'Intencje Parafialne',
    description: intentionsData?.description || '',
    days:
      intentionsData?.days?.map(getParsedIntentionDay).filter(isNotNull) || []
  }

  return result
}

const getParsedIntentionDay = (day: Maybe<IntentionsDays>) => {
  if (!day) return null
  const index = parseInt(day.day)
  const polishDay = POLISH_DAYS[index]
  if (!polishDay) return null

  if (!day.intentions || day.intentions.length === 0) {
    return {
      day: polishDay,
      date: getDayOfWeek(index),
      intentions: [
        {
          hour: '',
          intention: 'Brak intencji'
        }
      ]
    }
  }

  return {
    day: polishDay,
    date: getDayOfWeek(index),
    intentions: day.intentions.map(getParsedIntention).filter(isNotNull)
  }
}

const getParsedIntention = (intention: Maybe<IntentionsDaysIntentions>) => {
  if (!intention) return null
  if (!intention.hour || !intention.intention) return null

  return {
    hour: intention.hour,
    intention: intention.intention
  }
}
