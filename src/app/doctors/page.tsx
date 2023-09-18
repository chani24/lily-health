"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Footer from "../_components/Footer/Footer";

import styles from "./doctors.module.css";
import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";

import { fetcher, imageLoader } from "../_lib/strapi-rest";

export default function Doctors() {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const { data, error } = useSWR("/api/doctors?populate=*", fetcher);

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
                Doctors and health professionals
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <p>
                Lily health, established in 2021 , was created with the aim to
                provide products, services, and resources  that ensure women
                experience maximum health and wellness stability especially
                concerning fertility.
              </p>
            </div>
          </div>
        </div>
        <div className={"my-5 container-padding " + styles.collage_container}>
          <div className={styles.collage_wrapper}>
            {data?.data?.map(
              (
                doctor: {
                  id: string;
                  attributes: {
                    avatar: { data: { attributes: { url: string } } };
                    firstName: string;
                    lastName: string;
                    availability: string;
                  };
                },
                index: number
              ) => {
                return (
                  <Link key={index} href={"/doctor-profile?id=" + doctor.id}>
                    <div data-aos="fade-up" className={styles.collage_block}>
                      <div className={styles.collage_image}>
                        <Image
                          loader={imageLoader}
                          alt="doctor"
                          src={doctor.attributes.avatar.data.attributes.url}
                          fill
                        />{" "}
                      </div>
                      <span className={styles.name}>
                        {doctor.attributes.firstName +
                          " " +
                          doctor.attributes.lastName}
                      </span>
                      <span className={styles.status}>
                        {doctor.attributes.availability
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
