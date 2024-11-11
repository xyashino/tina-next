import { DesktopNavigation } from '@/components/header/desktop-navigation'
import { MobileNavigation } from '@/components/header/mobile-navigation'
import { CrossIcon } from '@/components/icons/cross-icon'
import { getNavigation } from '@/services/navigation.service'

export const Header = async () => {
  const navigation = await getNavigation()
  console.log({ navigation })
  return (
    <nav className="mb-10 flex min-h-10 w-full items-center justify-between border-b pb-5 pt-4 sm:min-h-14 lg:justify-around px-4">
      <a className="group flex items-center text-foreground" href="/">
        <CrossIcon className="size-6" />
        <span className="translate-y-[10%] text-lg lg:text-xl font-semibold group-hover:underline content">
          Gruszow Wielki
        </span>
      </a>
      <DesktopNavigation data={navigation} />
      <MobileNavigation data={navigation} />
    </nav>
  )
}
