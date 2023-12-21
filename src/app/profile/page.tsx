"use client";

import Image from "next/image";
import Link from "next/link";

import Footer from "../_components/Footer/Footer";

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../_lib/context/user";
import TopNav from "../_components/TopNav/TopNav";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";

import { fetcher, imageLoader } from "../_lib/strapi-rest";

export default function Profile() {
  const router = useRouter();
  const { user, checkLogin, firstName } = useContext(UserContext);
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const res = await checkLogin();
      if (res.status === 200) {
      }
    };
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const { data, error } = useSWR("/api/doctors?populate=*", fetcher);

  return (
    <>
      <TopNav />
      <main>
        <div className="py-8 rounded-lg md:rounded-none mt-3 md:mt-0 container-padding">
          <div
            data-aos="fade-up"
            className="md:py-[80px] flex flex-col md:flex-row md:justify-between"
          >
            <div className="w-full md:w-[65%] md:pr-[30px]">
            <p>  <h1 className={styles.header}>Welcome, {firstName}</h1>
             </p> <p>
                Caring for your health is our top priority. Explore our roster
                of available doctors who are dedicated to providing you with
                expert care
              </p>
            </div>
          </div>
        </div>
        <div className={"my-5 container-padding " + styles.collage_container}>
          <div className={styles.collage_wrapper}>
            {data?.data?.map(
              (
                doctor: {
                  attributes: {
                    profession: string;
                    avatar: { data: { attributes: { url: string } } };
                    firstName: string;
                    lastName: string;
                    availability: string;
                    uid: string;
                  };
                },
                index: number
              ) => {
                return (
                  <Link
                    key={index}
                    href={"/doctor-profile?id=" + doctor.attributes.uid}
                  >
                    <div
                      data-aos="fade-up"
                      className={styles.collage_block + " doctor-card"}
                    >
                      <div className={styles.collage_image}>
                        <Image
                          loader={imageLoader}
                          alt="doctor"
                          src={
                            doctor?.attributes?.avatar?.data?.attributes?.url
                          }
                          fill
                        />
                        <div className="doctor-card_footer">
                          {" "}
                          <div>
                            <div className="pill">
                              {doctor?.attributes?.availability
                                ? "Available"
                                : "Unavailable"}
                            </div>
                            <div className="name">
                              {doctor?.attributes?.firstName}{" "}
                              {doctor?.attributes?.lastName}
                            </div>
                            <div className="title">
                              {doctor?.attributes?.profession}
                            </div>
                          </div>
                        </div>
                      </div>
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
