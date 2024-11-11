'use client'
import { GalleryItem } from '@/components/gallery/gallery-item'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const GalleryGrid = ({ data }: { data: GalleryData }) => {
  const activeGroups = data.groups
  const defaultGroup = activeGroups[0]?.groupTitle || ''

  return (
    <Tabs defaultValue={defaultGroup} className="w-full" orientation="vertical">
      <TabsList className="w-full justify-start mb-8 bg-white/50 backdrop-blur-sm">
        {activeGroups.map(group => (
          <TabsTrigger
            key={group.groupTitle}
            value={group.groupTitle}
            className="text-base"
          >
            {group.groupTitle}
          </TabsTrigger>
        ))}
      </TabsList>

      {activeGroups.map(group => (
        <TabsContent key={group.groupTitle} value={group.groupTitle}>
          <div className="grid grid-cols-1">
            {group.images.map((image, index) => (
              <GalleryItem key={index} {...image} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
