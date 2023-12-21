"use client";

import Image from "next/image";

import Footer from "../_components/Footer/Footer";

import styles from "./gallery.module.css";
import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Gallery() {
  /* useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);*/
  return (
    <>
      <TopNav />
      <main>
        <div className="py-8 rounded-lg md:rounded-none mt-3 md:mt-0 container-padding">
          <div
            
            className="md:py-[80px] flex flex-col md:flex-row md:justify-between"
          >
            <div className="w-full md:w-[45%] md:pr-[30px]">
              <p><h1 className={styles.header}>
                a cross section of the families we have helped.
              </h1></p>
              
            </div>
            <div className="w-full md:w-1/2">
              <p>
                Lily health, established in 2021 , was created with the aim to
                provide products, services, and resources that ensure women
                experience maximum health and wellness stability especially
                concerning fertility.
              </p>

              <p>
                Lily health would serve as a one stop shop for mothers to gain
                insight and services related to their reproductive wellness
                needs, which in return, allows them to service as the best
                mother, partner, and selves they could possibly be.
              </p>
            </div>
          </div>
          <div className="my-5 slide-container container-padding">
            <div className="slide-wrapper six-slides horizontal-scrolling-items">
              <div className="slide">
                <Image alt="infant" src="/images/infant.png" fill />{" "}
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-8.jpg" fill />
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-3.png" fill />
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-7.jpg" fill />{" "}
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-2.png" fill />
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-3.png" fill />
              </div>
            </div>
          </div>
          <div className="my-5 slide-container container-padding">
            <div className="slide-wrapper six-slides horizontal-scrolling-items reverse">
              <div className="slide">
                <Image alt="infant" src="/images/infant-4.png" fill />{" "}
              </div>
              <div className="slide">
                <Image
                  alt="man, woman and infant"
                  src="/images/man-woman-and-infant-2.jpg"
                  fill
                />
              </div>
              <div className="slide">
                <Image
                  alt="man and infant"
                  src="/images/man-and-infant-.png"
                  fill
                />
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-4.png" fill />{" "}
              </div>
              <div className="slide">
                <Image
                  alt="man and infant"
                  src="/images/man-and-infant-2.png"
                  fill
                />
              </div>
              <div className="slide">
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant-4.jpg"
                  fill
                />
              </div>
            </div>
          </div>
          <div className="my-5 slide-container container-padding">
            <div className="slide-wrapper six-slides horizontal-scrolling-items">
              <div className="slide">
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant-5.jpg"
                  fill
                />{" "}
              </div>
              <div className="slide">
                <Image
                  alt="man woman and infant"
                  src="/images/man-woman-and-infant.png"
                  fill
                />
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-9.jpg" fill />
              </div>
              <div className="slide">
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant-2.png"
                  fill
                />{" "}
              </div>
              <div className="slide">
                <Image
                  alt="man woman and infant"
                  src="/images/man-woman-and-infant-3.jpg"
                  fill
                />
              </div>
              <div className="slide">
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant.png"
                  fill
                />
              </div>
            </div>
          </div>
          <div className="my-5 slide-container container-padding">
            <div className="slide-wrapper six-slides horizontal-scrolling-items reverse">
              <div className="slide">
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant-5.jpg"
                  fill
                />{" "}
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-5.png" fill />
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-6.png" fill />
              </div>
              <div className="slide">
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant-5.jpg"
                  fill
                />{" "}
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-5.png" fill />
              </div>
              <div className="slide">
                <Image alt="infant" src="/images/infant-6.png" fill />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
