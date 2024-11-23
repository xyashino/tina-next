import { ClientContact } from '@/app/contact/client-contact'
import { ServerContact } from '@/app/contact/server-contact'
import client from '@/tina/client'
import { draftMode } from 'next/headers'

export default async function ContactPage() {
  const { isEnabled } = draftMode()

  const pageResponse = await client.queries.contact({
    relativePath: 'contact.json',
    draftMode: isEnabled
  })

  if (!isEnabled) {
    return <ClientContact {...pageResponse} />
  }

  return <ServerContact {...pageResponse.data} />
}
