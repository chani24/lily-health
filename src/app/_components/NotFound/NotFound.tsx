import Image from'next/image'
import Link from 'next/link'

import styles from './notfound.module.css'



export default function NotFound() {


  return (
    <main>
      <div className={styles.container}>
        
        <h1 className="text-center mb-3">404</h1>
        <p className="text-center">Page not found</p>
        <div className="my-7 max-w-3xl ">
          <Link href="/"><button className="button button-primary w-full inverse-size-button mb-3 md:me-3">Go back to Homepage</button></Link>
        </div>
          </div>
          </main>
  )
}
