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
import formatDate from "../_lib/formatDate";

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
      duration: 1500,
    });
  }, []);

  const { data } = useSWR(
    "/api/doctors/" + props.searchParams.id + "?populate=*",
    fetcher
  );

  const { data: topDoctors } = useSWR(
    "/api/doctors?populate=*&filters[id][$ne]=" +
      props.searchParams.id +
      "&pagination[pageSize]=3&pagination[page]=1",
    fetcher
  );

  const { data: reviews } = useSWR(
    "/api/reviews?populate=*&filters[doctor][id][$eq]=" +
      props.searchParams.id +
      "&pagination[pageSize]=3&pagination[page]=1",
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
                <span className={styles.name}>
                  {data?.data?.attributes?.firstName +
                    " " +
                    data?.data?.attributes?.lastName}
                </span>
                <span className={styles.status}>
                  {data?.data?.attributes?.profession}
                </span>
              </div>
            </div>
            <div
              className={styles.image}
              style={{
                backgroundImage:
                  "url(" +
                  data?.data?.attributes?.avatar?.data?.attributes?.url +
                  ")",
              }}
            ></div>
          </div>
          <div className="md:py-[80px] md:px-[148px] flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-2/3 md:pr-[80px] container-padding">
              <div>
                <h1 className={styles.header}>Overview</h1>
                <p className={styles.p}>{data?.data?.attributes?.bio}</p>
              </div>
              <div className="mt-[40px]">
                <h2 className={styles.header}>Reviews</h2>
              </div>
              {reviews?.data?.length > 1 ? (
                reviews.data?.map(
                  (
                    review: {
                      attributes: {
                        createdAt: string;
                        users_permissions_user: {
                          data: {
                            attributes: {
                              firstName: string;
                              lastName: string;
                            };
                          };
                        };
                        date: string;
                        description: string;
                      };
                    },
                    index: Key | null | undefined
                  ) => {
                    return (
                      <div key={index}>
                        <div className="flex items-end mt-3 mb-[-10px]">
                          <span className={styles.name_small}>
                            {
                              review?.attributes?.users_permissions_user?.data
                                ?.attributes?.firstName
                            }{" "}
                            {
                              review?.attributes?.users_permissions_user?.data
                                ?.attributes?.lastName
                            }
                          </span>{" "}
                          <span className={styles.p + " mx-3 mb-3"}>
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
                          <span className={styles.p}>
                            {formatDate(review?.attributes?.createdAt)}
                          </span>
                        </div>
                        <p className={styles.p}>
                          {review?.attributes?.description}
                        </p>
                      </div>
                    );
                  }
                )
              ) : (
                <p className={styles.p}>No reviews yet</p>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <div className="z-40 bg-[#FDEFF0] fixed bottom-0 left-0 w-full md:hidden container-padding py-4 flex justify-between items-center">
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
                <p className={styles.header + " mb-5"}>Available Sessions</p>
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

                          <div className="flex items-center">
                            <div className={styles.pill}>
                              {resource.times.length}
                              {" slot(s)"}
                            </div>
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
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                                  strokeWidth="1.66667"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
                    profession: string;
                    avatar: {
                      data: { attributes: { url: string } };
                    };
                    firstName: string;
                    lastName: string;
                    availability: any;
                  };
                },
                index: Key | null | undefined
              ) => {
                return (
                  <Link key={index} href={"/doctor-profile?id=" + doctor.id}>
                    <div className={styles.collage_block + " doctor-card"}>
                      <div className={styles.collage_image}>
                        <Image
                          loader={imageLoader}
                          alt="doctor"
                          src={
                            doctor?.attributes?.avatar?.data?.attributes?.url
                          }
                          fill
                        />{" "}
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
      <div className="pb-[115px] md:pb-0"></div>
    </>
  );
}
