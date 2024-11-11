import { ContactGoogleMap } from '@/components/contact/contact-google-map'
import { ContactItem } from '@/components/contact/contact-item'
import { PageTitle } from '@/components/page-title'
import client from '@/tina/client'

export default async function ContactPage() {
  const response = await client.queries.contact({
    relativePath: 'contact.json'
  })

  const contact = response.data.contact

  return (
    <section className="animate-fadeIn my-auto h-full bg-background">
      <div className="container mx-auto">
        <PageTitle title={contact.title} description={contact.description} />
        <div className="mt-6 flex flex-col">
          <div className="flex flex-col divide-y divide-foreground">
            {contact.contactItems?.map(group => <ContactItem {...group} />)}
          </div>
          <ContactGoogleMap googleMapsUrl={contact.googleMapsUrl ?? ''} />
        </div>
      </div>
    </section>
  )
}
