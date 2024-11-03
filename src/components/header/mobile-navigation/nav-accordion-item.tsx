import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface NavAccordionItemProps {
  group: NavigationGroup
}

export const NavAccordionItem = ({ group }: NavAccordionItemProps) => (
  <AccordionItem value={group.title}>
    <AccordionTrigger className="px-4 text-sm">{group.title}</AccordionTrigger>
    <AccordionContent>
      <div className="flex flex-col gap-2 px-4 pb-2">
        {group.links.map(link => (
          <a
            key={link.title}
            href={link.path}
            className="rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <div className="font-medium">{link.title}</div>
            {link.description && (
              <p className="text-xs text-muted-foreground">{link.description}</p>
            )}
          </a>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
)