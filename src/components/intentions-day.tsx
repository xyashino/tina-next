'use client'

import { AccordionContent, AccordionItem } from '@/components/ui/accordion'

import { AccordionTrigger } from '@/components/ui/accordion'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export const IntentionsDay = ({ day, date, intentions }: IntentionsDay) => {
  return (
    <AccordionItem value={day}>
      <AccordionTrigger className="text-lg lg:text-2xl font-semibold text-start">
        {day}{' '}
        {date && (
          <span className="text-lg pl-2 italic font-thin">({date})</span>
        )}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        {intentions.map(intention => {
          return (
            <div className="flex gap-2 px-1 lg:px-6 py-4 text-sm lg:text-lg odd:bg-accent">
              <p className="font-bold text-lg">{intention.hour}</p>
              <TinaMarkdown content={intention.intention} />
            </div>
          )
        })}
      </AccordionContent>
    </AccordionItem>
  )
}
