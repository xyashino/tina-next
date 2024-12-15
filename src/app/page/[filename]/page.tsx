import { client } from '@/tina/client'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import { ClientPage } from './client-page'
import { ServerPage } from './server-page'

interface PageProps {
  params: unknown
}

export const generateStaticParams = async () => {
  const pagesResponse = await client.queries.pageConnection()
  const paths =
    pagesResponse.data.pageConnection.edges
      ?.map(page => {
        if (!page?.node?._sys.filename) return null
        const filename = page.node._sys.filename
        return { filename }
      })
      .filter(Boolean) || []
  return paths || []
}

const paramsSchema = z.object({
  filename: z.string()
})

const PostPage = async (props: PageProps) => {
  try {
    if (!props?.params) return notFound()
    const parsedParams = paramsSchema.safeParse(props.params)
    if (!parsedParams.success) return notFound()

    const { isEnabled } = draftMode()
    const pageResponse = await client.queries.page({
      relativePath: `${parsedParams.data.filename}.mdx`
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
