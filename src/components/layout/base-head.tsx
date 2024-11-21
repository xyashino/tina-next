import { Metadata } from 'next'
import { getSiteConfig } from '@/config/site'

type BaseHeadProps = {
  title?: string
  description?: string
  image?: { src: string; alt?: string }
  pageType?: 'website' | 'article'
}

export function generateMetadata({
  title,
  description,
  image,
  pageType = 'website'
}: BaseHeadProps): Metadata {
  const siteConfig = getSiteConfig()
  const fullTitle = [title, siteConfig.title].filter(Boolean).join(' | ')

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: pageType,
      ...(image?.src && { images: [{ url: image.src, alt: image.alt }] })
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(image?.src && { images: [{ url: image.src, alt: image.alt }] })
    }
  }
}