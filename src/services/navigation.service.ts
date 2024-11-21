import { LinkType } from '@/enum/link-type.enum'
import client from '@/tina/client'
import type {
  Maybe,
  NavigationGroups,
  NavigationGroupsLinks
} from '@/tina/types'
import { z } from 'zod'

const linkItemSchema = z.object({
  title: z.string(),
  href: z.string()
})

const groupLinkSchema = linkItemSchema.extend({
  description: z.string()
})

export const getNavigation = async (): Promise<NavigationItem[]> => {
  const navigation = await client.queries.navigationConnection({
    filter: { groups: { isEnabled: { eq: true } } }
  })

  if (!navigation.data) {
    throw new Error('Navigation not found')
  }

  const navigationData = navigation.data.navigationConnection.edges?.[0]?.node
  const groups =
    navigationData?.groups
      ?.map(group => getGroupItem(group as NavigationGroups))
      .filter((item): item is NavigationItem => item !== null) ?? []

  return groups
}

const getGroupItem = (
  group: Maybe<NavigationGroups>
): NavigationLink | NavigationGroup | null => {
  if (!group?.links?.length || !group.label) return null

  const isSingleLink = group.links.length === 1
  const [firstLink] = group.links

  if (isSingleLink && firstLink) {
    const linkItem = getLinkItem(firstLink)
    return linkItem ? { type: 'link', ...linkItem } : null
  }

  const links = group.links
    .map(link => getLinkItem(link, 'group'))
    .filter((item): item is NavigationGroupsLink => item !== null)

  return links.length ? { type: 'group', title: group.label, links } : null
}

const getLinkItem = (
  link: Maybe<NavigationGroupsLinks>,
  type: 'link' | 'group' = 'link'
): BaseNavigationLink | NavigationGroupsLink | null => {
  if (!link) return null

  switch (link.type) {
    case LinkType.EXTERNAL: {
      const schema = type === 'group' ? groupLinkSchema : linkItemSchema
      const linkItem = schema.safeParse({
        title: link.name,
        href: link.externalUrl,
        ...(type === 'group' && { description: link.description ?? '' })
      })
      return linkItem.success ? linkItem.data : null
    }
    case LinkType.PAGE: {
      const schema = type === 'group' ? groupLinkSchema : linkItemSchema
      const linkItem = schema.safeParse({
        title: link.name,
        href: link.page?.slug ?? '',
        ...(type === 'group' && { description: link.description ?? '' })
      })
      return linkItem.success ? linkItem.data : null
    }
    default:
      return null
  }
}
