"use client";

import Image from "next/image";

import Footer from "../_components/Footer/Footer";

import styles from "./gallery.module.css";
import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Lily Health - Gallery",
};

export default function Gallery() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  return (
    <>
      <TopNav />
      <main>
        <div className="bg-lighter py-8 rounded-lg md:rounded-none mt-3 md:mt-0 container-padding">
          <div
            data-aos="fade-up"
            className="md:py-[80px] flex flex-col md:flex-row md:justify-between"
          >
            <div className="w-full md:w-[45%] md:pr-[30px]">
              <h1 className={styles.header}>
                A cross section of the families we have helped.
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <p>
                Lily health, established in 2021 , was created with the aim to
                provide products, services, and resources  that ensure women
                experience maximum health and wellness stability especially
                concerning fertility.
              </p>
              <p>
                Women’s health has always been a sensitive topic to us. Our
                founder experienced the loss of her mother at the age of 5, and
                growing up without a maternal figure, made her realise the
                importance of mothers in the socialisation of a child. With this
                in mind, she decided to ensure that no child or mother has to
                deal with the loss I experienced.
              </p>
              <p>
                Lily health would serve as a one stop shop for mothers to gain
                insight and services related to their reproductive wellness
                needs, which in return, allows them to service as the best
                mother, partner, and selves they could possibly be.
              </p>
            </div>
          </div>
          <div className={"my-5 " + styles.collage_container}>
            <div className={styles.collage_wrapper}>
              <div data-aos="fade-up" className={styles.collage_image}>
                <Image alt="infant" src="/images/infant.png" fill />{" "}
              </div>
              <div
                data-aos="fade-up"
                className={styles.collage_image + " " + styles.large}
              >
                <Image alt="infant" src="/images/infant-2.png" fill />
              </div>
              <div data-aos="fade-up" className={styles.collage_image}>
                <Image alt="infant" src="/images/infant-3.png" fill />
              </div>
              <div
                data-aos="fade-up"
                className={styles.collage_image + " " + styles.large}
              >
                <Image alt="infant" src="/images/infant-4.png" fill />
              </div>
              <div data-aos="fade-up" className={styles.collage_image}>
                <Image
                  alt="man and infant"
                  src="/images/man-and-infant-2.png"
                  fill
                />{" "}
              </div>
              <div data-aos="fade-up" className={styles.collage_image}>
                <Image
                  alt="man and infant"
                  src="/images/man-and-infant-.png"
                  fill
                />
              </div>
              <div data-aos="fade-up" className={styles.collage_image}>
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant-2.png"
                  fill
                />{" "}
              </div>
              <div
                data-aos="fade-up"
                className={styles.collage_image + " " + styles.large}
              >
                <Image
                  alt="man woman and infant"
                  src="/images/man-woman-and-infant.png"
                  fill
                />
              </div>
              <div data-aos="fade-up" className={styles.collage_image}>
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant.png"
                  fill
                />
              </div>
              <div
                data-aos="fade-up"
                className={styles.collage_image + " " + styles.large}
              >
                <Image
                  alt="woman and infant"
                  src="/images/woman-and-infant-3.png"
                  fill
                />
              </div>
              <div data-aos="fade-up" className={styles.collage_image}>
                <Image alt="infant" src="/images/infant-5.png" fill />{" "}
              </div>
              <div data-aos="fade-up" className={styles.collage_image}>
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
