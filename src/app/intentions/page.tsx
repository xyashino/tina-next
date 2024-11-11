import { IntentionsDay } from '@/components/intentions-day'
import { PageTitle } from '@/components/page-title'
import { Accordion } from '@/components/ui/accordion'
import { getActiveIntentions } from '@/services/intentions.service'

const AnnouncementsPage = async () => {
  const intentions = await getActiveIntentions()
  return (
    <div>
      <PageTitle
        title={intentions?.title ?? 'Intencje Parafialne'}
        description={intentions?.description}
      />
      <Accordion type="multiple">
        {intentions.days.map(day => (
          <IntentionsDay {...day} />
        ))}
      </Accordion>
    </div>
  )
}

export default AnnouncementsPage
