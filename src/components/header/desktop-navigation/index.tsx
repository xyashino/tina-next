import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { NavigationGroupItem } from './navigation-group'
import { NavigationType } from '@/enum/navigation-type.enum'

interface DesktopNavigationProps {
  data: NavigationItem[]
}

export const DesktopNavigation = ({ data }: DesktopNavigationProps) => {
  return (
    <NavigationMenu className="hidden w-full max-w-3xl lg:block">
      <NavigationMenuList>
        {data.map(group => (
          <NavigationGroupItem key={group.title} data={group} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
