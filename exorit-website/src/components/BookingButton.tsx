import { ReactNode } from 'react'
import { site } from '../config/site'
import { trackEvent } from '../lib/analytics'

type BookingButtonProps = {
  children?: ReactNode
  variant?: 'primary' | 'light'
  size?: 'md' | 'lg'
  className?: string
  /** Where on the page this button lives — recorded with the analytics event. */
  location: string
}

/**
 * Primary conversion action for the whole site.
 * Points at the booking tool configured in src/config/site.ts and fires an
 * analytics event so we can tell which section actually produces calls.
 */
const BookingButton = ({
  children = 'Book a 20-min call',
  variant = 'primary',
  size = 'lg',
  className = '',
  location,
}: BookingButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl',
    light: 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl',
  }

  const sizes = {
    md: 'text-base py-2.5 px-6',
    lg: 'text-lg py-3.5 px-8',
  }

  const handleClick = () => {
    trackEvent('booking_click', { location })
  }

  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  )
}

export default BookingButton
