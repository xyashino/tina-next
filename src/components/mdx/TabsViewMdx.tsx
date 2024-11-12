import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { z } from 'zod'

const tabsViewPropsSchema = z.object({
  groups: z.array(
    z.object({
      tabId: z.string(),
      tabTitle: z.string(),
      tabContent: z.any()
    })
  )
})

export const TabsViewMdx = (props: any) => {
  const parsedProps = tabsViewPropsSchema.safeParse(props)
  if (!parsedProps.success) return null
  const { groups } = parsedProps.data
  return (
    <Tabs defaultValue={groups[0].tabId} className="w-full">
      <TabsList className="w-full border-b border-foreground">
        {groups.map(group => (
          <TabsTrigger
            key={`trigger-${group.tabId}`}
            value={group.tabId}
            className="text-base"
          >
            {group.tabTitle}
          </TabsTrigger>
        ))}
      </TabsList>

      {groups.map(group => (
        <TabsContent key={`content-${group.tabId}`} value={group.tabId}>
          <TinaMarkdown content={group.tabContent} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
