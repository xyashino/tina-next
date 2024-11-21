import Image from 'next/image'
import Link from 'next/link'

export const GalleryItem = ({
  coverPhoto,
  link,
  title,
  description
}: GalleryImage) => (
  <div className="group w-full flex even:flex-row-reverse hover:bg-accent/50 transition-colors duration-300 h-[200px] animate-in fade-in border-foreground border-b">
    <div className="h-full aspect-[4/3] overflow-hidden relative">
      <Image
        src={coverPhoto}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-4 w-full flex flex-col">
      <h3 className="text-lg lg:text-2xl font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
      <Link
        href={link}
        className="text-md lg:text-lg font-semibold mt-auto p-1 underline  group-even:mr-auto group-odd:ml-auto"
        target="_blank"
        rel="noopener noreferrer"
      >
        Zobacz album
      </Link>
    </div>
  </div>
)
