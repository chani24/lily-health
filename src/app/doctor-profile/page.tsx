"use client";
import Image from "next/image";

import Footer from "../_components/Footer/Footer";

import styles from "./doctors.module.css";
import type { Metadata } from "next";
import { useState } from "react";
import gsap from "gsap";

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
export default function Doctors() {
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
      <main>
        <div className="">
          <div className={"relative " + styles.photo_card}>
            <div className={styles.upper}></div>
            <div className={"container-padding " + styles.lower}>
              <div>
                <span className={styles.header}>Temitope Aiyegbusi</span>
                <span className={styles.status}>Medical Doctor</span>
              </div>
            </div>
            <div className={styles.image}></div>
          </div>
          <div className="md:py-[80px] md:px-[148px] flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-2/3 md:pr-[80px] container-padding">
              <div>
                <h1 className={styles.header}>Overview</h1>
                <p className={styles.p}>
                  Temitope is a distinguished medical doctor whose life's work
                  has been dedicated to the betterment of healthcare and the
                  well-being of her patients. With a career spanning over three
                  decades, he has left an indelible mark on the medical field.
                </p>
                <p className={styles.p}>
                  His life story is a testament to the profound impact that one
                  individual can have on the world of medicine and the lives of
                  the people she serves. Her unwavering commitment to her
                  patients, her community, and her family exemplifies the
                  qualities of a true medical pioneer and humanitarian.
                </p>
              </div>
              <div>
                <h2 className={styles.header}>Reviews</h2>
              </div>
              <div>
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
                        fill-opacity="0.8"
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
              </div>
              <div>
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
                        fill-opacity="0.8"
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
              </div>
              <div>
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
                        fill-opacity="0.8"
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
              </div>
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
                        >
                          <div>
                            <h4>{resource.date}</h4>
                          </div>

                          <div onClick={() => toggleResource(index)}>
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
          <div className={styles.collage_wrapper}>
            {doctors.map((doctor, index) => {
              return (
                <div key={index} className={styles.collage_block}>
                  <div className={styles.collage_image}>
                    <Image
                      alt="infant"
                      src={"/images/" + doctor.image + ".png"}
                      fill
                    />{" "}
                  </div>
                  <span className={styles.name}>{doctor.name}</span>
                  <span className={styles.status}>{doctor.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
