import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import type { NavigationGroups } from '@/tina/types'
import { NavigationListItem } from './navigation-list-item'

type NavigationGroupItemProps = {
  group: NavigationGroups
}

export const NavigationGroupItem = ({ group }: NavigationGroupItemProps) => {
  if (group.links?.length === 1) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <a
            href={group.links[0].path}
            className={navigationMenuTriggerStyle()}
          >
            {group.title}
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{group.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-2 gap-3 bg-background p-2 md:w-[400px] lg:w-[500px]">
          {group.links?.map((link, index, array) => (
            <NavigationListItem
              key={link.title}
              title={link.title}
              href={link.path}
              joinCols={index === array.length - 1 && array.length % 2 !== 0}
            >
              {link.description}
            </NavigationListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
