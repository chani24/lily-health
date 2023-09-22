"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { useState } from "react";
import gsap from "gsap";
import { fetcher, imageLoader } from "@/app/_lib/strapi-rest";

export default function Search(props: { className: string }) {
  // Function to open the dropdown
  const openDropdown = () => {
    gsap.to("." + styles.dropdown_wrapper, {
      height: "100vh",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  // Function to close the dropdown
  const closeDropdown = () => {
    gsap.to("." + styles.dropdown_wrapper, {
      height: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const [nav, setNav] = useState(false);
  const openNav = () => {
    setNav(true);
    openDropdown();
  };

  const closeNav = () => {
    setNav(false);
    closeDropdown();
  };

  const [doctors, setDoctors] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  const handleInput = (e: any) => {
    const query = e.target.value;
    if (Boolean(query)) {
      fetcher(
        `/api/doctors?populate=*&filters[firstName][$containsi]=${query}&[lastName][$containsi]=${query}&[profession][$containsi]=${query}&pagination[pageSize]=3&pagination[page]=1`
      )
        .then((data) => {
          const doctors = data.data;
          if (doctors.length < 1) {
            setSearchMessage("No doctor found");
            setDoctors([]);
          } else {
            setSearchMessage("");
            setDoctors(doctors);
          }
        })
        .catch((e) => setSearchMessage("Doctor not found"));
    } else {
      setDoctors([]);
    }
  };

  return (
    <div className={styles.dropdown_wrapper + " " + props.className}>
      <div className={"container-padding " + styles.dropdown}>
        <input
          onChange={handleInput}
          className={styles.search_input}
          name="query"
          placeholder="Search"
        />
        {searchMessage && (
          <div className="text-center pt-5 text-gray-600 text-lg">
            {searchMessage}
          </div>
        )}
        {doctors.length > 0 && (
          <div className={styles.collage_wrapper}>
            {doctors.map(
              (
                doctor: {
                  id: string;
                  attributes: {
                    profession: string;
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
        )}
      </div>
    </div>
  );
}
