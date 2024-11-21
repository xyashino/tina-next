import { DesktopNavigation } from '@/components/header/desktop-navigation'
import { MobileNavigation } from '@/components/header/mobile-navigation'
import { getNavigation } from '@/services/navigation.service'

export const Header = async () => {
  const navigation = await getNavigation()
  return (
    <nav className="mb-10 flex min-h-10 w-full items-center justify-between border-b pb-5 pt-4 sm:min-h-14 lg:justify-around px-4">
      <a className="text-xl font-semibold hover:underline" href="/">
        Gruszow Wielki
      </a>
      <DesktopNavigation data={navigation} />
      <MobileNavigation data={navigation} />
    </nav>
  )
}
