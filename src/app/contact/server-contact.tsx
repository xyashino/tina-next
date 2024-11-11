import { ContactGoogleMap } from '@/components/contact/contact-google-map'
import { ContactItem } from '@/components/contact/contact-item'
import { PageTitle } from '@/components/page-title'
import type { ContactQuery } from '@/tina/types'

export const ServerContact = ({ contact }: ContactQuery) => (
  <>
    <PageTitle title={contact.title} description={contact.description} />
    <div className="mt-6 flex flex-col">
      <div className="flex flex-col divide-y divide-foreground">
        {contact.contactItems?.map(group => <ContactItem {...group} />)}
      </div>
      <ContactGoogleMap googleMapsUrl={contact.googleMapsUrl ?? ''} />
    </div>
  </>
)
