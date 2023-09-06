import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container-padding">
      <div className="bg-light py-8 px-5 my-4 rounded-lg flex flex-col items-center justify-center md:h-screen">
        <div className="hidden bg-light py-3 px-5 md:flex w-[720px] justify-between items-center rounded-[50px]">
          <div className="flex"><Image alt="3 doctors" src="/images/three-icons.png" height={24} width={56} className='me-3'/>Thousands of professionals available at your disposal!</div>
          <div className='text-lg font-semibold'>Search</div>
        </div>
        <h1 className="heading text-center my-7 max-w-4xl">a new platform of care for mothers.</h1>
        <p className="text-center max-w-2xl md:text-xl">Your one stop platform for mothers to gain insight  and services related to their reproductive wellness needs.</p>
        <div className="my-7 max-w-3xl md:flex">
          <Link href="login"><button className="button button-primary w-full inverse-size-button mb-3 md:me-3">Login</button></Link>
          <Link href="book"><button className="button button-outline w-full  inverse-size-button md:ms-3">Book a Doctor</button></Link>
        </div>
    </div>
    </main>
  )
}
