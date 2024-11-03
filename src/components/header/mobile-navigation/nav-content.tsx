import { Accordion } from '@/components/ui/accordion'
import { NavAccordionItem } from './nav-accordion-item'
import { SingleNavLink } from './single-nav-link'

type NavContentProps = {
  data: NavigationGroup[]
}
export const NavContent = ({ data }: NavContentProps) => (
  <nav className="flex flex-col gap-4 mt-2">
    <Accordion type="multiple"  className="w-full">
      {data.map(group =>
        group.links.length === 1 ? (
          <SingleNavLink
            key={group.title}
            title={group.title}
            path={group.links[0].path}
          />
        ) : (
          <NavAccordionItem key={group.title} group={group} />
        )
      )}
    </Accordion>
  </nav>
)