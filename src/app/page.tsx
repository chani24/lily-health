'use client'

import { useRef, useEffect, useState } from 'react';
import Image from'next/image'
import Link from 'next/link'
import gsap from 'gsap';


import './page.css'

export default function Home() {
  useEffect(() => {
  /*  const scrollableContent = document.querySelector('.slide-wrapper') as HTMLElement;
    const middleImage = document.querySelector('.middle-slide') as HTMLElement;
    
    if (scrollableContent && middleImage) {
      console.log('scrolling')
      const containerWidth = scrollableContent.offsetWidth;
      const middleImageWidth = middleImage.offsetWidth;
      const scrollTo = middleImage.offsetLeft - (containerWidth / 2) + (middleImageWidth / 2);
      
      gsap.to(scrollableContent, { x: -scrollTo, duration: 0.5 });
    }*/
  }, []);

  const [doctorsSlide, setDoctorsSlide] = useState(0)

  const scrollDoctorsLeft = () => {
   if (doctorsSlide <= 2 && doctorsSlide > 0) {
      const scrollableContent = document.querySelector('.slide-wrapper.doctors') as HTMLElement;
      const Image = document.querySelector('.slide.doctors') as HTMLElement;
      const slide = doctorsSlide - 1;

      if (scrollableContent && Image) {
        setDoctorsSlide(slide)
        const ImageWidth = Image.offsetWidth;
        const scrollTo = (ImageWidth * slide);
        
        gsap.to(scrollableContent, { x: -scrollTo, duration: 0.5 });
      }
    }
  }

  const scrollDoctorsRight = () => {
    if (doctorsSlide === 0 || doctorsSlide === 1) {
      const scrollableContent = document.querySelector('.slide-wrapper.doctors') as HTMLElement;
      const Image = document.querySelector('.slide.doctors') as HTMLElement;
      const slide = doctorsSlide + 1;

      if (scrollableContent && Image) {
        setDoctorsSlide(slide)
        const ImageWidth = Image.offsetWidth;
        const scrollTo = (ImageWidth * slide) + 10;
        console.log(ImageWidth)
        
        gsap.to(scrollableContent, { x: -scrollTo, duration: 0.5 });
      }
    } 
  }

  const topDoctors = [
    {
      image: 'bruno-rodrigues',
      bookingLink: ''
    },
    {
      image: 'rian-ramirez',
      bookingLink: ''
    },
    {
      image: 'usman-yousaf',
      bookingLink: ''
    },
  ]



  return (
    <main>
      <div className="container-padding">
        <div className="bg-lighter py-8 px-5 my-4 rounded-lg flex flex-col items-center justify-center md:h-screen">
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
      </div></div>
      <div className="mt-3 mb-5 slide-container container-padding">
        <div className="slide-wrapper">
        <div className="slide"><Image alt="infant" src="/images/infant.png" fill/> </div>
        <div className="slide middle-slide"><Image alt="infant" src="/images/infant-2.png" fill/></div>
        <div className="slide"><Image alt="infant" src="/images/infant-3.png" fill/></div>
      </div>
      </div>
      
      <div className="sm-container-padding">
        <div className="bg-light py-8 rounded-lg md:rounded-none">
        <div className="container-padding flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[45%] md:pr-[50px]">
            <p>Lily Health</p>
            <h2 className="h2">Creating maximum health and wellness stability</h2>
          </div>
          <div className="w-full md:w-1/2">
            <p>Lily health, established in 2021 , was created with the aim to provide products, services, and resources  that ensure women experience maximum health and wellness stability especially concerning fertility.</p>
            <p>Women’s health has always been a sensitive topic to us. 
Our founder experienced the loss of her mother at the age of 5, and growing up without a maternal figure, made her realise the importance of mothers in the socialisation of a child.  With this in mind, she decided to ensure that no child or mother has to deal with the loss I experienced.</p>
          <Link href=""><button className='button button-light mt-3'>Read more</button></Link>
          </div>
        </div>
        <div className="my-5 slide-container container-padding">
        <div className="slide-wrapper">
        <div className="slide"><Image alt="man and infant" src="/images/man-and-infant.png" fill/> </div>
        <div className="slide middle-slide"><Image alt="man and infant" src="/images/man-and-infant-2.png" fill/></div>
        <div className="slide"><Image alt="woman and infant" src="/images/woman-and-infant.png" fill/></div>
      </div>
      </div>
      </div></div>
      <div className="sm-container-padding pt-5 md:pt-0">
        <div className="bg-lighter py-8 rounded-lg md:rounded-none">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="container-padding w-full md:w-[45%] md:pr-[50px]">
            
              <h3 className="h3">Glance through the top professionals on our platform.</h3>
              <p>Get comprehensive in-person and virtual care to support your physical, mental and reproductive health.</p>
              <div className="my-[24px] md:my-[64px] flex gap-3">
              <svg onClick={scrollDoctorsLeft} className="arrow-button"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
    >
      <rect width="60" height="60" rx="30" fill="#FF086F" />
      <path
        d="M27.57 23.9299L21.5 29.9999L27.57 36.0699"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.5 30H21.67"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
                </svg>
                <svg onClick={scrollDoctorsRight} className="arrow-button"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
    >
      <rect
        width="60"
        height="60"
        rx="30"
        transform="matrix(-1 0 0 1 60 0)"
        fill="#FF086F"
      />
      <path
        d="M32.43 23.9299L38.5 29.9999L32.43 36.0699"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 30H38.33"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
              </div>
          </div>
            <div className="w-full md:w-1/2">
            <div className="my-5 slide-container doctors sm-container-padding hide-scrollbar">
                <div className="slide-wrapper doctors">
                  {topDoctors.map((doctor, index) => {
                    return (
                      <div key={index} className="slide doctors"><Image alt="doctor" src={"/images/" + doctor.image + ".png"} fill/> <div className="button-container"> <Link href={doctor.bookingLink}><button className="button button-primary button-small">Book</button></Link></div></div>
                    )
                  })}
      </div>
      </div>
          </div>
        </div>
        </div></div>
      <div className="my-3 md:my-0 bg-[#FF9EC4] sm-container-padding">
        <div className='pt-2 pb-[40px] md:py-[129px] md:px-[132px]'>
          <p className="hero-heading my-4 mb-6">HOW TO GET HELP AND SPEAK TO A PROFESSIONAL</p>
          <div className="collage">
            <div className="left">
              <div className="large bg-[#FB5B46]">
                <div className="container-padding text">
                  <p>01</p>
                  <p>Search</p>
                  <span>Search through our platform with a robust range of medical professionals</span>
                </div>
                <div className="image"><Image alt="doctor" src="/images/usman-yousaf.png" fill/></div>
              </div>
              <div className="small bg-[#E4394D]">
                <div className="container-padding text">
                  <p>02</p>
                  <p>Login</p>
                  <span>Create an account on our platform and you can decide to be anonymous or have a user profile.</span>
                </div>
              </div>
            </div>
            <div className='right'>
              <div className="small bg-[#FF2771]">
                <div className="container-padding text">
                  <p>03</p>
                  <p>Book</p>
                  <span>Discover and reserve appointments with a diverse range of medical professionals seamlessly</span>
                </div>
              </div>
            <div className="large bg-[#FB5B46] md:bg-[#FF4D93]">
                <div className='container-padding text'>
                  <p>04</p>
                  <p>Help</p>
                  <span>Get the assistance and support you need from our dedicated team to make the most of our platform.</span>
                </div>
                <div className="image"><Image alt="doctor" src="/images/infant--2.png" fill/></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="sm-container-padding">
        <div className="bg-lighter py-8 rounded-lg md:rounded-none">
        <div className="container-padding md:py-[80px] flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[45%] md:pr-[40px]">
            <h3 className="h3">A platform approved by mothers and intending mothers.</h3>
          </div>
          <div className="w-full md:w-1/2">
            <p>We are a group of individuals committed to providing products, services, and resources  that ensure women experience maximum health and wellness stability especially concerning fertility.</p>
        </div>
        </div>
        <div className="my-5 slide-container container-padding">
        <div className="slide-wrapper">
        <div className="slide"><Image alt="infant" src="/images/infant-4.png" fill/> </div>
              <div className="slide bg-[#FF086F] rounded-lg container-padding py-3 flex flex-col justify-between text-white" >
                <p className='text-xl'>LILY Health empowers women and couples with tailored, safe, and accessible fertility treatments, focusing on compassionate care and patient-centered strategies.</p>
                <p className='text-2xl font-semibold'>Anonymous</p>
        </div>
        <div className="slide"><Image alt="infant" src="/images/infant.png" fill/></div>
      </div>
      </div>
        </div></div>
      <div className='container-padding'>
        <div className="bg-[#FF086F] relative text-white pt-8 my-4 overflow-hidden rounded-lg flex flex-col md:flex-row items-center justify-center">
          <div className="container-padding md:px-[80px] md:py-[40px] md:w-1/2"><h3 className="h3 text-center md:text-left my-5 max-w-4xl">Join us to gain access to world-class health professionals</h3>
        <p className="text-center  md:text-left  max-w-2xl md:text-xl">Search through our platform with a robust range of medical professionals</p>
        <div className="my-7 max-w-3xl md:flex">
          <Link href="login"><button className="button button-light w-full inverse-size-button mb-3 md:me-3">Login</button></Link>
          <Link href="book"><button className="button button-light-outline w-full  inverse-size-button md:ms-3">Book a Doctor</button></Link>
            </div></div>
          <div className="w-full md:w-1/2 md:h-full"><div className="mini-hero-image">
            <Image alt="infant" src="/images/infant--2.png" fill/>
          </div></div>
          
        
        
      </div>
      </div>

      
    </main>
  )
}
