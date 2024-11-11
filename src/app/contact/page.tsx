import { ClientContact } from '@/app/contact/client-contact'
import { ServerContact } from '@/app/contact/server-contact'
import client from '@/tina/client'
import { draftMode } from 'next/headers'

export default async function ContactPage() {
  const pageResponse = await client.queries.contact({
    relativePath: 'contact.json'
  })
  const { isEnabled } = draftMode()

  if (!isEnabled) {
    return <ClientContact {...pageResponse} />
  }

  return <ServerContact {...pageResponse.data} />
}
