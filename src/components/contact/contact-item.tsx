'use client'

import { useRef } from 'react'

export const ContactItem = ({
  label,
  value,
  description
}: ContactContactItems) => {
  const contactItemRef = useRef<HTMLParagraphElement>(null)

  const handleClick = () => {
    navigator.clipboard.writeText(value)
    const p = contactItemRef.current
    if (!p) return

    const originalText = value
    p.textContent = 'Copied!'

    setTimeout(() => {
      p.textContent = originalText
    }, 1000)
  }

  return (
    <button
      className="flex w-full cursor-pointer flex-col items-start p-6 transition-colors duration-150 hover:bg-accent focus:bg-accent focus:outline-none"
      onClick={handleClick}
    >
      <div className="flex w-full gap-2">
        <h3 className="text-xl font-bold italic">{label}:</h3>
        <p className="text-lg" data-contact ref={contactItemRef}>
          {value}
        </p>
      </div>
      <p className="text-sm">{description}</p>
    </button>
  )
}
