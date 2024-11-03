import { ContactGoogleMap } from '@/components/contact/contact-google-map'
import { ContactItem } from '@/components/contact/contact-item'
import client from '../../../tina/__generated__/client'

export default async function ContactPage() {
  const response = await client.queries.contact({
    relativePath: 'contact.json'
  })

  const contact = response.data.contact

  return (
    <section className="animate-fadeIn my-auto h-full bg-background">
      <div className="container mx-auto">
        <header className="mx-auto mb-6 w-full max-w-3xl sm:mb-8">
          <h2 className="text-theme-foreground font-serif text-2xl font-medium leading-tight sm:text-4xl">
            {contact.title}
          </h2>

          <p className="mt-1 text-sm leading-tight">{contact.description}</p>
        </header>
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
