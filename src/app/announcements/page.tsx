import { PageTitle } from '@/components/page-title'
import { getAnnouncements } from '@/services/annoucments.service'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

const AnnouncementsPage = async () => {
  const announcements = await getAnnouncements()
  console.log({ announcements })
  return (
    <div>
      <PageTitle
        title={announcements?.title ?? 'Ogłoszenia Parafialne'}
        description={announcements?.description}
      />
      <div className="prose">
        <TinaMarkdown content={announcements?.body} />
      </div>
    </div>
  )
}

export default AnnouncementsPage
