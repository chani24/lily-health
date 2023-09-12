import type { Metadata } from 'next'
import NotFound from './_components/NotFound/NotFound'

export const metadata: Metadata = {
  title: 'Lily Health - Page Not Found',
}


export default function NotFoundPage() {

  return (
    <NotFound/>
  )
}
