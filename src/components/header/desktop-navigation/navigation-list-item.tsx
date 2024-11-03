import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import type { ComponentProps, PropsWithChildren } from 'react'

type ListItemProps = PropsWithChildren<
  ComponentProps<'a'> & { title: string; joinCols?: boolean }
>

export const NavigationListItem = ({
  className,
  title,
  children,
  joinCols = false,
  ...props
}: ListItemProps) => (
  <li className={cn('h-full', joinCols && 'col-span-2')}>
    <NavigationMenuLink asChild>
      <a
        className={cn(
          'block h-full w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
)
