"use client";
import Image from "next/image";

import Footer from "../_components/Footer/Footer";

import styles from "./doctors.module.css";
import { Key, useEffect, useState } from "react";
import gsap from "gsap";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";

import TopNav from "../_components/TopNav/TopNav";
import { fetcher, imageLoader } from "../_lib/strapi-rest";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const doctors = [
  {
    name: "Bola Akintayo",
    status: "Available",
    image: "doctor-3",
  },
  {
    name: "Bello Chan",
    status: "Available",
    image: "doctor",
  },
  {
    name: "Celine Elumelu",
    status: "Available",
    image: "doctor-2",
  },
];

const availableTimes = [
  {
    date: "Saturday, 5th of July, 2023",
    isOpen: false,
    times: ["4:30 PM", "5:00 PM", "5:30 PM"],
  },
  {
    date: "Sunday, 6th of July, 2023",
    isOpen: false,
    times: ["4:30 PM", "5:00 PM", "5:30 PM"],
  },
  {
    date: "Monday, 7th of July, 2023",
    isOpen: false,
    times: ["4:30 PM", "5:00 PM", "5:30 PM"],
  },
  {
    date: "Tuesday, 8th of July, 2023",
    isOpen: false,
    times: ["4:30 PM", "5:00 PM", "5:30 PM"],
  },
];
export default function Doctors(props: any) {
  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  const { data } = useSWR(
    "/api/doctors/" + props.searchParams.id + "?populate=*",
    fetcher
  );

  const { data: topDoctors } = useSWR(
    "/api/doctors?populate=*&pagination[pageSize]=3&pagination[page]=1",
    fetcher
  );

  const { data: reviews } = useSWR(
    "/api/doctors?populate=*&pagination[pageSize]=5&pagination[page]=1",
    fetcher
  );
  const [resources, setResources] = useState(availableTimes);
  const [activeTime, setActiveTime] = useState([0, 0]);
  const [inPerson, setInPerson] = useState(true);
  const toggleResource = (index: number) => {
    const copyOfResources = [...resources];
    if (copyOfResources[index].isOpen) {
      copyOfResources[index].isOpen = false;
      gsap.to(".resource_" + index, { height: 0, duration: 0.5 });
    } else {
      copyOfResources[index].isOpen = true;
      gsap.to(".resource_" + index, { height: "auto", duration: 0.5 });
    }

    setResources(copyOfResources);
  };

  const chooseTime = (dayIndex: any, TimeIndex: any) => {
    setActiveTime([dayIndex, TimeIndex]);
  };

  return (
    <>
      <TopNav />
      <main>
        <div className="">
          <div className={"relative " + styles.photo_card}>
            <div className={styles.upper}></div>
            <div className={"container-padding " + styles.lower}>
              <div>
                <span className={styles.header}>
                  {data?.data?.attributes.firstName +
                    " " +
                    data?.data?.attributes.lastName}
                </span>
                <span className={styles.status}>
                  {data?.data?.attributes.profession}
                </span>
              </div>
            </div>
            <div
              className={styles.image}
              style={{
                backgroundImage:
                  "url(" +
                  process.env.STRAPI_API_ENDPOINT +
                  data?.data?.attributes.avatar.data.attributes.url +
                  ")",
              }}
            ></div>
          </div>
          <div className="md:py-[80px] md:px-[148px] flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-2/3 md:pr-[80px] container-padding">
              <div>
                <h1 className={styles.header}>Overview</h1>
                <p className={styles.p}>{data?.data?.attributes.bio}</p>
              </div>
              <div>
                <h2 className={styles.header}>Reviews</h2>
              </div>
              {/*<div>
                <div className="flex items-end mt-3 mb-[-10px]">
                  <span className={styles.name}>Veronica Sanches</span>{" "}
                  <span className={styles.p + " mx-3"}>
                    <svg
                      width="2"
                      height="3"
                      viewBox="0 0 2 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="1"
                        cy="1.5"
                        r="1"
                        fill="#111111"
                        fillOpacity="0.8"
                      />
                    </svg>
                  </span>
                  <span className={styles.p}>12th April, 2023</span>
                </div>
                <p className={styles.p}>
                  I highly recommend Dr. Temitope Aiyegbusi for his outstanding
                  remote care. He asked the right questions, provided valuable
                  guidance, and his expertise made the entire experience
                  seamless and reassuring.
                </p>
                  </div>*/}
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-light md:hidden container-padding py-4 mb-[40px] flex justify-between items-center">
                <div>
                  <span className={styles.name + " mb-[-8px]"}>
                    09 Sep 2023, 4:15pm
                  </span>
                  <p className={styles.p}>Next Available</p>
                </div>
                <button className={"button button-primary " + styles.btn}>
                  Check Availability
                </button>
              </div>
              <div className="hidden md:block">
                <p className={styles.header + " mb-5"}>Book other doctors</p>
                <span className={"mt-[-8px] " + styles.p}>
                  Schedule one-on-one sessions based on your preference.
                </span>
                <div className="my-5 grid grid-cols-1 gap-3">
                  {resources.map((resource, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.outer_box + " flex-col"}
                      >
                        <div
                          className={
                            "flex justify-between items-center " +
                            styles.upper_div
                          }
                          onClick={() => toggleResource(index)}
                        >
                          <div>
                            <h4>{resource.date}</h4>
                          </div>

                          <div>
                            {resource.isOpen ? (
                              <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 13L10 8L5 13"
                                  stroke="#404D78"
                                  stroke-width="1.66667"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 8L10 13L15 8"
                                  stroke="#404D78"
                                  stroke-width="1.66667"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div
                          className={
                            styles.resource + " flex gap-3 resource_" + index
                          }
                        >
                          {resource.times.map((time, id) => {
                            return (
                              <div
                                key={id}
                                onClick={() => chooseTime(index, id)}
                                className={
                                  activeTime[0] === index &&
                                  activeTime[1] === id
                                    ? "bg-lighter mt-3 " + styles.inner_box
                                    : "mt-3 " + styles.inner_box
                                }
                              >
                                <span>{time}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className={styles.outer_box}>
                    <div
                      onClick={() => setInPerson(false)}
                      className={
                        inPerson
                          ? styles.inner_box + ""
                          : styles.inner_box + " bg-lighter"
                      }
                    >
                      Virtual
                    </div>
                    <div
                      onClick={() => setInPerson(true)}
                      className={
                        inPerson
                          ? styles.inner_box + " bg-lighter"
                          : styles.inner_box + ""
                      }
                    >
                      In-Person
                    </div>
                  </div>
                </div>
                <button
                  className={
                    "button button-primary " + styles.btn + " " + styles.btn_2
                  }
                >
                  Book Session for{" "}
                  {resources[activeTime[0]].times[activeTime[1]]}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "my-5 container-padding  md:px-[148px] " + styles.collage_container
          }
        >
          <p className={styles.header + " mb-5"}>Book other doctors</p>
          <div data-aos="fade-up" className={styles.collage_wrapper}>
            {topDoctors?.data?.map(
              (
                doctor: {
                  id: string;
                  attributes: {
                    avatar: {
                      data: { attributes: { url: string | StaticImport } };
                    };
                    firstName: string;
                    lastName: string;
                    availability: any;
                  };
                },
                index: Key | null | undefined
              ) => {
                return (
                  <Link href={"/doctor-profile?id=" + doctor.id}>
                    <div key={index} className={styles.collage_block}>
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
