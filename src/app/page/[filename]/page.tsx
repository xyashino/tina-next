import { client } from '@/tina/client'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { ClientPage } from './client-page'
import { ServerPage } from './server-page'

interface PostPageProps {
  params: { filename: string }
}

export const generateStaticParams = async () => {
  const pagesResponse = await client.queries.pageConnection()
  return pagesResponse.data.pageConnection.edges?.map(page => ({
    filename: page?.node?._sys.filename
  }))
}

const PostPage = async ({ params }: PostPageProps) => {
  try {
    const { isEnabled } = draftMode()

    const pageResponse = await client.queries.page({
      relativePath: `${params.filename}.mdx`,
      draftMode: isEnabled
    })

    const page = pageResponse.data.page
    if (!page) return notFound()

    if (!isEnabled) {
      return <ClientPage {...pageResponse} />
    }

    if (!page.isPublished) return notFound()

    return <ServerPage {...page} />
  } catch (error) {
    return notFound()
  }
}

export default PostPage
