import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { Accordion } from '@/components/ui/accordion'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { z } from 'zod'

export const accordionPropsSchema = z.object({
  type: z.enum(['multiple', 'single']),
  options: z.array(
    z.object({
      uniqueId: z.string(),
      title: z.string(),
      body: z.any()
    })
  )
})

export const AccordionMdx = (props: any) => {
  const parsedProps = accordionPropsSchema.safeParse(props)
  if (!parsedProps.success) return null
  const { type, options } = parsedProps.data
  return (
    <Accordion type={type}>
      {options.map(option => (
        <AccordionItem value={option.uniqueId} key={option.uniqueId}>
          <AccordionTrigger className="text-lg lg:text-2xl font-semibold text-start">
            {option.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 even:bg-foreground prose">
            <TinaMarkdown content={option.body} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
