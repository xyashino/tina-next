import { getCurrentMonday, getNextMonday } from '@/lib/utils'
import { client } from '@/tina/client'

export const getAnnouncements = async () => {
  const announcements = await client.queries.announcementsConnection({
    first: 1,
    filter: {
      date: {
        after: getCurrentMonday(),
        before: getNextMonday()
      }
    },
    sort: 'date_DESC'
  })
  return announcements.data.announcementsConnection.edges?.[0]?.node
}
