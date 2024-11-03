import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import type { NavigationGroups } from '@/tina/types'
import { NavigationGroupItem } from './navigation-group'

interface DesktopNavigationProps {
  data: (NavigationGroups | null)[] | null
}

export const DesktopNavigation = ({ data }: DesktopNavigationProps) => {
  if (!data) {
    return null
  }

  return (
    <NavigationMenu className="hidden w-full max-w-3xl lg:block">
      <NavigationMenuList>
        {data?.map(group => {
          if (!group) {
            return null
          }
          return <NavigationGroupItem key={group.title} group={group} />
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
