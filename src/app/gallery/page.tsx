import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { PageTitle } from '@/components/page-title'
import { getGallery } from '@/services/gallery.service'

const GalleryPage = async () => {
  const galleryResponse = await getGallery()

  return (
    <main>
      <PageTitle
        title="Galeria"
        description="Odnośniki przekierowują do albumów w Google Photos."
      />
      <GalleryGrid data={galleryResponse} />
    </main>
  )
}

export default GalleryPage
