"use client";
import Image from "next/image";

import Footer from "../_components/Footer/Footer";

import styles from "./doctors.module.css";
import { Key, useContext } from "react";
import useSWR from "swr";
import "aos/dist/aos.css";

import TopNav from "../_components/TopNav/TopNav";
import { fetcher, imageLoader } from "../_lib/strapi-rest";
import Link from "next/link";
import formatDate from "../_lib/formatDate";

import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../_lib/context/user";
import BookingSection from "./BookingSection";

export default function Doctors(props: any) {
  const { data } = useSWR(
    "/api/doctors/?populate=*&filters[uid][$eq]=" + props.searchParams.id,
    fetcher
  );

  const { data: topDoctors } = useSWR(
    "/api/doctors?populate=*&filters[uid][$ne]=" +
      props.searchParams.id +
      "&pagination[pageSize]=3&pagination[page]=1",
    fetcher
  );

  const { data: reviews } = useSWR(
    "/api/reviews?populate=*&filters[doctor][uid][$eq]=" +
      props.searchParams.id +
      "&pagination[pageSize]=3&pagination[page]=1",
    fetcher
  );

  return (
    <>
      <TopNav />
      <main>
        <div className="">
          <div className={"relative " + styles.photo_card}>
            <div className={styles.upper}></div>
            <div className={"container-padding " + styles.lower}>
              <div>
                <span className={styles.name + " mt-[-2px]"}>
                  {data?.data[0].attributes?.firstName +
                    " " +
                    data?.data[0].attributes?.lastName}
                </span>
                <span className={styles.status}>
                  {data?.data[0].attributes?.profession}
                </span>
              </div>
            </div>
            <div
              className={styles.image}
              style={{
                backgroundImage:
                  "url(" +
                  data?.data[0].attributes?.avatar?.data?.attributes?.url +
                  ")",
              }}
            ></div>
          </div>
          <div className="md:py-[80px] md:px-[148px] flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-2/3 md:pr-[80px] container-padding">
              <div>
                <h1 className={styles.header}>Overview</h1>
                <p className={styles.p}>{data?.data[0].attributes?.bio}</p>
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
                        user: {
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
                              review?.attributes?.user?.data?.attributes
                                ?.firstName
                            }{" "}
                            {
                              review?.attributes?.user?.data?.attributes
                                ?.lastName
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
                          <span className={styles.status}>
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
            <BookingSection doctorId={data?.data[0]?.id} />
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
                  attributes: {
                    profession: string;
                    avatar: {
                      data: { attributes: { url: string } };
                    };
                    firstName: string;
                    lastName: string;
                    availability: any;
                    uid: string;
                  };
                },
                index: Key | null | undefined
              ) => {
                return (
                  <Link
                    key={index}
                    href={"/doctor-profile?id=" + doctor.attributes.uid}
                  >
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
