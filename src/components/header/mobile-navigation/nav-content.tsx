import { Accordion } from '@/components/ui/accordion'
import { NavAccordionItem } from './nav-accordion-item'
import { SingleNavLink } from './single-nav-link'

type NavContentProps = {
  data: NavigationItem[]
}
export const NavContent = ({ data }: NavContentProps) => (
  <nav className="flex flex-col gap-4 mt-2">
    <Accordion type="multiple" className="w-full">
      <SingleNavLink key="home" title="Strona główna" path="/" />
      {data.map(group => {
        if (group.type === 'group') {
          return <NavAccordionItem key={group.title} group={group} />
        }
        return (
          <SingleNavLink
            key={group.title}
            title={group.title}
            path={group.href}
          />
        )
      })}
    </Accordion>
  </nav>
)