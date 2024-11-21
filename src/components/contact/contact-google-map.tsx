type ContactGoogleMapProps = {
  googleMapsUrl: string
}

export const ContactGoogleMap = ({ googleMapsUrl }: ContactGoogleMapProps) => (
  <div className='lg:col-span-2'>
    <iframe
      src={googleMapsUrl}
      className='h-[400px] w-full'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
      title='Google Maps'
    />
  </div>
)
