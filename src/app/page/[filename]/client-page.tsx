'use client'
import { useTina } from 'tinacms/dist/react'
import { ServerPage } from './server-page'

interface ClientPageProps {
  query: string
  variables: object
  data: any
  isPublished: boolean
}

export const ClientPage = ({
  query,
  variables,
  data,
  isPublished
}: ClientPageProps) => {
  const { data: tinaData } = useTina({
    query: query,
    variables: variables,
    data: data
  })

  return (
    <>
      {!tinaData.page.isPublished && (
        <p className="w-full bg-blue-200 p-4 text-xl mb-5">
          Strona nie jest opublikowana
        </p>
      )}
      <ServerPage {...tinaData.page} />
    </>
  )
}
