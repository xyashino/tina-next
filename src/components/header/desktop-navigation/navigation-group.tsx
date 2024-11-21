import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { NavigationType } from '@/enum/navigation-type.enum'
import { NavigationListItem } from './navigation-list-item'

type NavigationGroupItemProps = {
  data: NavigationItem
}

export const NavigationGroupItem = ({ data }: NavigationGroupItemProps) => {
  if (data.type === NavigationType.LINK) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <a href={data.href} className={navigationMenuTriggerStyle()}>
            {data.title}
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{data.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-2 gap-3 bg-background p-2 md:w-[400px] lg:w-[500px]">
          {data.links.map((link, index, array) => (
            <NavigationListItem
              key={link.title}
              title={link.title}
              href={link.href}
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
