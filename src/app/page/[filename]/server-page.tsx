import { AccordionMdx } from '@/components/mdx/AccordionMdx'
import { TabsViewMdx } from '@/components/mdx/TabsViewMdx'
import type { Page } from '@/tina/types'
import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export const ServerPage = ({ title, body, showTitle, image }: Page) => {
  return (
    <div className="prose max-w-3xl">
      {image && (
        <div className="relative w-full aspect-video overflow-hidden mb-8">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      {showTitle && (
        <h1 className="font-serif text-2xl font-medium leading-tight sm:text-4xl">
          {title}
        </h1>
      )}
      <TinaMarkdown
        content={body}
        components={{
          Accordion: props => <AccordionMdx {...props} />,
          TabsView: props => <TabsViewMdx {...props} />
        }}
      />
    </div>
  )
}
