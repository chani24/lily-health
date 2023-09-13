import Image from'next/image'

import Footer from '../_components/Footer/Footer';

import styles from './doctors.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lily Health - Doctors',
}

const doctors = [
  {
    name: 'Bola Akintayo',
    status: 'Available',
    image: 'doctor-3'
  },
  {
    name: 'Bello Chan',
    status: 'Available',
    image: 'doctor'
  },
  {
    name: 'Celine Elumelu',
    status: 'Available',
    image: 'doctor-2'
  },
  {
    name: 'Bola Akintayo',
    status: 'Available',
    image: 'doctor-3'
  },
  {
    name: 'Aice Wole',
    status: 'Available',
    image: 'doctor'
  },
  {
    name: 'Celine Elumelu',
    status: 'Available',
    image: 'doctor-2'
  },{
    name: 'Bola Akintayo',
    status: 'Available',
    image: 'doctor-3'
  },
  {
    name: 'Aice Wole',
    status: 'Available',
    image: 'doctor'
  },{
    name: 'Celine Elumelu',
    status: 'Available',
    image: 'doctor-2'
  },
]
export default function Doctors() {

  return (
    <>
    <main>
        <div className="bg-lighter py-8 rounded-lg md:rounded-none mt-3 md:mt-0 container-padding">
        <div className="md:py-[80px] flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[45%] md:pr-[30px]">
            <h1 className={styles.header}>Doctors and health professionals</h1>
          </div>
          <div className="w-full md:w-1/2">
            <p>Lily health, established in 2021 , was created with the aim to provide products, services, and resources  that ensure women experience maximum health and wellness stability especially concerning fertility.</p>
           
          </div>
          </div>
          
        
        </div>
      <div className={"my-5 container-padding " + styles.collage_container}>
            <div className={styles.collage_wrapper}>
              {doctors.map((doctor, index) => {
                return (
                  <div key={index} className={styles.collage_block}>
                     <div className={styles.collage_image}><Image alt="infant" src={"/images/" +doctor.image+ ".png"} fill/> </div>
                    <span className={styles.name}>{doctor.name}</span>
                    <span className={styles.status}>{doctor.status}</span>
                  </div>
                )
              })}
       
            </div>
      </div>

      
    </main>
    <Footer/></>
  )
}
