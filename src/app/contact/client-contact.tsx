'use client'

import { ServerContact } from '@/app/contact/server-contact'
import { ClientInfo } from '@/components/client-info'
import { useTina } from 'tinacms/dist/react'

export const ClientContact = ({ query, variables, data }: any) => {
  const { data: tinaData } = useTina({
    query: query,
    variables: variables as any,
    data: data
  })

  return (
    <>
      <ClientInfo />
      <ServerContact {...tinaData} />
    </>
  )
}
