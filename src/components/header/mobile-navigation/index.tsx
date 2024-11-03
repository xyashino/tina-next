import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { NavContent } from './nav-content'

type MobileNavigationProps = {
  data: NavigationGroup[]
}
export const MobileNavigation = ({ data }: MobileNavigationProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden">
          <Menu className="size-6" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <NavContent data={data} />
      </SheetContent>
    </Sheet>
  )
}