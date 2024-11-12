import { AccordionMdx } from '@/components/mdx/AccordionMdx'
import { TabsViewMdx } from '@/components/mdx/TabsViewMdx'
import type { Page } from '@/tina/types'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export const ServerPage = ({ title, body, showTitle }: Page) => {
  return (
    <div className="prose max-w-3xl">
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
