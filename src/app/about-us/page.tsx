'use client'

import { useRef, useEffect, useState } from 'react';
import Image from'next/image'
import gsap from 'gsap';

import Footer from '../_components/Footer/Footer';

import styles from './about.module.css'
import type { Metadata } from 'next'

/*export const metadata: Metadata = {
  title: 'Lily Health - About Us',
}*/



export default function About() {



  return (
    <>
    <main>
        <div className="bg-lighter py-8 rounded-lg md:rounded-none mt-3 md:mt-0 container-padding">
        <div className="md:py-[80px] flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[45%] md:pr-[30px]">
            <h1 className={styles.header}>Creating maximum health and wellness stability</h1>
          </div>
          <div className="w-full md:w-1/2">
            <p>Lily health, established in 2021 , was created with the aim to provide products, services, and resources  that ensure women experience maximum health and wellness stability especially concerning fertility.</p>
            <p>Women’s health has always been a sensitive topic to us. Our founder experienced the loss of her mother at the age of 5, and growing up without a maternal figure, made her realise the importance of mothers in the socialisation of a child.  With this in mind, she decided to ensure that no child or mother has to deal with the loss I experienced.</p>
            <p>Lily health would serve as a one stop shop for mothers to gain insight and services related to their reproductive wellness needs, which in return, allows them to service as the best mother, partner, and selves they could possibly be.</p>
        </div>
          </div>
          <div className={styles.banner_image}></div>
        
        </div>
        <div className="container-padding md:flex md:gap-2">
        <div className={styles.large_card + " bg-[#FF4D93]"}>
                <div className={"container-padding " + styles.text}>
                  <p>Our Mission</p>
                  <span>LILY Health empowers women and couples with tailored, safe, and accessible fertility treatments, focusing on compassionate care and patient-centered strategies.</span>
                </div>
                <div className={styles.image}><Image alt="doctor" src="/images/rian-ramirez-2.png" fill/></div>
              </div><div className={styles.large_card + " bg-[#FF2771] " +styles.second}>
                <div className={"container-padding " + styles.text}>
                  <p>Our Vision</p>
                  <span>Our goal is to revolutionize the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples.</span>
                </div>
                <div className={styles.image}><Image alt="doctor" src="/images/bruno-rodrigues-2.png" fill/></div>
              </div>
        </div>
        
      <div className="my-3 md:my-0 bg-lighter sm-container-padding">
          <div className='pt-2 pb-[40px] md:py-[129px] md:px-[132px]'>
            <div>
              
            </div>
          <p className="my-4 mb-6">HOW TO GET HELP AND SPEAK TO A PROFESSIONAL</p>
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
      

      
    </main>
    <Footer/></>
  )
}
