import { DesktopNavigation } from '@/components/header/desktop-navigation'
import { CrossIcon } from '@/components/icons/cross-icon'
import { client } from '@/tina/client'

export const Header = async () => {
  const navigation = await client.queries.navigationConnection()
  const navigationData =
    navigation.data.navigationConnection.edges?.[0]?.node?.groups ?? []

  return (
    <nav className="mb-10 flex min-h-10 w-full items-center justify-between border-b pb-5 pt-4 sm:min-h-14 lg:justify-around px-4">
      <a className="group flex items-center text-foreground" href="/">
        <CrossIcon className="size-6" />
        <span className="translate-y-[10%] text-xl group-hover:underline">
          Parafia Gruszow Wielki
        </span>
      </a>
      <DesktopNavigation data={navigationData} />
      {/* <MobileNavigation data={navigationData} /> */}
    </nav>
  )
}
