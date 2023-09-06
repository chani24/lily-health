import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container-padding">
      <div className="bg-light py-8 px-5 my-4 rounded-lg flex flex-col justify-center">
        <h1 className="heading text-center mb-3">A new platform of care for mothers.</h1>
        <p className="text-center">Your one stop platform for mothers to gain insight  and services related to their reproductive wellness needs.</p>
        <div className="my-5">
          <Link href="login"><button className="button button-primary w-full mb-3">Login</button></Link>
          <Link href="book"><button className="button button-outline w-full">Book a Doctor</button></Link>
        </div>
    </div>
    </main>
  )
}
