import client from '@/tina/client'
import type { IntentionsDays } from '@/tina/types'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

const POLISH_DAYS = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela'
]

const AnnouncementsPage = async () => {
  const intentions = await client.queries.intentionsConnection()
  const intentionsData = intentions.data.intentionsConnection.edges?.[0]?.node
  return (
    <div>
      {intentionsData?.title}
      {intentionsData?.description}
      {intentionsData?.days?.map(day => {
        if (!day) return null
        return <AnnouncementsDay data={day} />
      })}
    </div>
  )
}

const AnnouncementsDay = ({ data }: { data: IntentionsDays }) => {
  if (!data) return null
  return (
    <div>
      <p>{POLISH_DAYS[parseInt(data.day)]}</p>
      {data.intentions?.map(intention => {
        if (!intention) return null
        return (
          <div>
            <p>{intention.hour}</p>
            <TinaMarkdown content={intention.intention} />
          </div>
        )
      })}
    </div>
  )
}

export default AnnouncementsPage
