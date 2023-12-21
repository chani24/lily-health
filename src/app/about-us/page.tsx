"use client";
import Image from "next/image";

import Footer from "../_components/Footer/Footer";

import styles from "./about.module.css";
import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <TopNav />
      <main>
        <div className="py-8 rounded-lg md:rounded-none mt-3 md:mt-0 container-padding">
          <div
            data-aos="fade-up"
            className="md:py-[80px] flex flex-col md:flex-row md:justify-between"
          >
            <div className="w-full md:w-[45%] md:pr-[30px]">
              <p>
                <h1 className={styles.header}>
                Creating maximum health and wellness stability
              </h1>
              </p>
              
            </div>
            <div className="w-full md:w-1/2">
              <p>
                Lily health, established in 2021 , was created with the aim to
                provide products, services, and resources that ensure women
                experience maximum health and wellness stability especially
                concerning fertility.
              </p>
              <p>
              Women’s health has always been a sensitive topic to us. Our founder experienced the loss of her mother at the age of 5, and growing up without a maternal figure, made her realise the importance of mothers in the socialisation of a child.  With this in mind, she decided to ensure that no child or mother has to deal with the loss I experienced.
              </p>
              <p>
                We would serve as a one stop shop for mothers to gain insight
                and services related to their reproductive wellness needs, which
                in return, allows them to service as the best mother, partner,
                and selves they could possibly be.
              </p>
            </div>
          </div>
          <div data-aos="fade-up" className={styles.banner_image}></div>
        </div>
        <div className="container-padding bg-light py-[24px] md:py-[48px] md:flex md:gap-2">
          <div
            data-aos="fade-up"
            className={styles.large_card + " bg-[#FF398C]"}
          >
            <div className={"container-padding small-container " + styles.text}>
              <p>Our Mission</p>
              <span>
                LILY Health empowers women and couples with tailored, safe, and
                accessible fertility treatments, focusing on compassionate care
                and patient-centered strategies.
              </span>
            </div>
            <div className={styles.image}>
              <Image alt="doctor" src="/images/rian-ramirez-2.png" fill />
            </div>
          </div>
          <div
            data-aos="fade-up"
            className={styles.large_card + " bg-[#6B032F] " + styles.second}
          >
            <div className={"container-padding  small-container " + styles.text}>
              <p>Our Vision</p>
              <span>
                Our goal is to revolutionize the fertility solutions market by
                fostering empathy, inclusivity, and support, aiming to provide
                hope and joy for women, young adults, and couples.
              </span>
            </div>
            <div className={styles.image}>
              <Image alt="doctor" src="/images/bruno-rodrigues-2.png" fill />
            </div>
          </div>
        </div>

        <div className="my-3 md:my-0 container-padding">
          <div className="py-[40px] md:py-[109px] md:flex">
            <div className="md:w-1/3 md:pr-[40px] ">
              <h3 className="h3">Our Values</h3>
              <p className="mt-3 mb-5 mb-6">
                These are the values our brand eludes and we uphold every bit of
                value.
              </p>
            </div>
            <div className="md:w-2/3 md:grid md:grid-cols-2 md:gap-x-2">
              <div
                data-aos="fade-up"
                className={styles.small_card + " bg-[#6B032F]"}
              >
                <div className={"container-padding small-container " + styles.text}>
                  <p>Privacy</p>
                  <span>
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </span>
                </div>
              </div>
              <div
                data-aos="fade-up"
                className={styles.small_card + " bg-[#FF086F]"}
              >
                <div className={"container-padding small-container " + styles.text}>
                  <p>Accessibility</p>
                  <span>
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </span>
                </div>
              </div>
              <div
                data-aos="fade-up"
                className={styles.small_card + " bg-[#E80765]"}
              >
                <div className={"container-padding small-container " + styles.text}>
                  <p>Competence</p>
                  <span>
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </span>
                </div>
              </div>
              <div
                data-aos="fade-up"
                className={styles.small_card + " bg-[#6B032F]"}
              >
                <div className={"container-padding small-container " + styles.text}>
                  <p>Education</p>
                  <span>
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
