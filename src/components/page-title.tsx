interface PageTitleProps {
  title: string
  description?: string | null
}

export const PageTitle = ({ title, description }: PageTitleProps) => {
  const descriptionExists = description && description.length > 0

  if (!descriptionExists) {
    return (
      <h2 className="mx-auto mb-6 w-full max-w-3xl font-serif text-2xl font-medium leading-tight sm:mb-8 sm:text-4xl">
        {title}
      </h2>
    )
  }

  return (
    <section className="mx-auto mb-6 w-full max-w-3xl sm:mb-8">
      <h2 className="font-serif text-2xl font-medium leading-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-tight">{description}</p>
    </section>
  )
}
