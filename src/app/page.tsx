"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "./_components/Footer/Footer";
import TopNav from "./_components/TopNav/TopNav";

import { fetcher, imageLoader } from "./_lib/strapi-rest";
import Search from "./_components/Search";

export default function Home(props: any) {
  const [dropdown, setDropdown] = useState(false);
  const openDropdown = () => {
    setDropdown(true);
    gsap.to(".search-dropdown", {
      height: "100vh",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };
  const [doctors, setDoctors] = useState([]);
  const { data, error } = useSWR(
    "/api/doctors?populate=*&pagination[pageSize]=5&pagination[page]=1",
    fetcher
  );
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setDoctors(data?.data);
    }
  }, [data]);

  const [doctorsSlide, setDoctorsSlide] = useState(0);

  const scrollDoctorsLeft = () => {
    if (doctorsSlide > 0 && doctorsSlide <= 4) {
      const scrollableContent = document.querySelector(
        ".slide-wrapper.doctors"
      ) as HTMLElement;
      const Image = document.querySelector(".slide.doctors") as HTMLElement;
      const slide = doctorsSlide - 1;

      if (scrollableContent && Image) {
        setDoctorsSlide(slide);
        const ImageWidth = Image.offsetWidth;
        //10 for the gap between elements
        const scrollTo = ImageWidth * slide + 10 * slide;

        gsap.to(scrollableContent, { x: -scrollTo, duration: 0.5 });
      }
    }
  };

  const scrollDoctorsRight = () => {
    const max = window.innerWidth > 767.9 ? 3 : 4;
    if (doctorsSlide >= 0 && doctorsSlide < max) {
      const scrollableContent = document.querySelector(
        ".slide-wrapper.doctors"
      ) as HTMLElement;
      const Image = document.querySelector(".slide.doctors") as HTMLElement;
      const slide = doctorsSlide + 1;

      if (scrollableContent && Image) {
        setDoctorsSlide(slide);
        const ImageWidth = Image.offsetWidth;
        const scrollTo = ImageWidth * slide + 10 * slide;

        gsap.to(scrollableContent, { x: -scrollTo, duration: 0.5 });
      }
    }

    if (doctorsSlide === max) {
      const scrollableContent = document.querySelector(
        ".slide-wrapper.doctors"
      ) as HTMLElement;

      if (scrollableContent) {
        setDoctorsSlide(0);

        gsap.to(scrollableContent, { x: 0, duration: 0.5 });
      }
    }
  };

  return (
    <>
      <TopNav searchDropdown={dropdown} setSearchDropdown={setDropdown} />
      <Search className="search-dropdown" />
      <main>
        <div className="container-padding">
          <div className="py-8 px-5 my-4 rounded-lg flex flex-col items-center justify-center md:h-screen">
            <div
              onClick={openDropdown}
              className="hidden bg-light py-3 px-5 md:flex w-[720px] justify-between items-center rounded-[50px]"
            >
              <div className="flex">
                <Image
                  alt="3 doctors"
                  src="/images/three-icons.png"
                  height={24}
                  width={56}
                  className="me-3"
                />
                Thousands of professionals available at your disposal!
              </div>
              <div>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21.5C16.7467 21.5 21 17.2467 21 12C21 6.75329 16.7467 2.5 11.5 2.5C6.25329 2.5 2 6.75329 2 12C2 17.2467 6.25329 21.5 11.5 21.5Z"
                    stroke="#FF086F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22.5L20 20.5"
                    stroke="#FF086F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h1
              data-aos="fade-up"
              className="heading text-center my-7 max-w-4xl"
            >
              a new platform of care for mothers.
            </h1>
            <p data-aos="fade-up" className="text-center max-w-2xl md:text-xl">
              Your one stop platform for mothers to gain insight and services
              related to their reproductive wellness needs.
            </p>
            <div data-aos="fade-up" className="my-7 max-w-3xl md:flex">
              <Link href="login">
                <button className="button button-primary w-full inverse-size-button mb-3 md:me-3">
                  Login
                </button>
              </Link>
              <Link href="doctors">
                <button className="button button-outline w-full  inverse-size-button md:ms-3">
                  Book a Doctor
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-5 slide-container container-padding">
          <div className="slide-wrapper six-slides horizontal-scrolling-items">
            <div className="slide">
              <Image alt="infant" src="/images/infant.png" fill />{" "}
            </div>
            <div className="slide">
              <Image alt="infant" src="/images/infant-2.png" fill />
            </div>
            <div className="slide">
              <Image alt="infant" src="/images/infant-3.png" fill />
            </div>
            <div className="slide">
              <Image alt="infant" src="/images/infant.png" fill />{" "}
            </div>
            <div className="slide">
              <Image alt="infant" src="/images/infant-2.png" fill />
            </div>
            <div className="slide">
              <Image alt="infant" src="/images/infant-3.png" fill />
            </div>
          </div>
        </div>

        <div className="sm-container-padding">
          <div className="bg-light py-8 rounded-lg md:rounded-none">
            <div
              data-aos="fade-up"
              className="container-padding flex flex-col md:flex-row md:justify-between"
            >
              <div className="w-full md:w-[45%] md:pr-[50px]">
                <p>Lily Health</p>
                <h2 className="h2">
                  Creating maximum health and wellness stability
                </h2>
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
                  founder experienced the loss of her mother at the age of 5,
                  and growing up without a maternal figure, made her realise the
                  importance of mothers in the socialisation of a child. With
                  this in mind, she decided to ensure that no child or mother
                  has to deal with the loss I experienced.
                </p>
                <Link href="about-us">
                  <button className="button button-light mt-3 button-small">
                    Read more
                  </button>
                </Link>
              </div>
            </div>
            <div className="my-5 slide-container container-padding">
              <div className="slide-wrapper six-slides horizontal-scrolling-items">
                <div className="slide">
                  <Image
                    alt="man and infant"
                    src="/images/man-and-infant.png"
                    fill
                  />{" "}
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
                    src="/images/woman-and-infant.png"
                    fill
                  />
                </div>
                <div className="slide">
                  <Image
                    alt="man and infant"
                    src="/images/man-and-infant.png"
                    fill
                  />{" "}
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
                    src="/images/woman-and-infant.png"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm-container-padding pt-5 md:pt-0">
          <div className="bg-[#ffffff26] md:bg-[#fff] py-8 rounded-lg md:rounded-none">
            <div
              className="flex flex-col lg:flex-row md:justify-between"
            >
              <div className="container-padding flex flex-col w-full lg:w-[45%] lg:pr-[50px] lg:justify-center">
                <h3 className="h3">
                  Glance through the top professionals on our platform.
                </h3>
                <p>
                  Get comprehensive in-person and virtual care to support your
                  physical, mental and reproductive health.
                </p>
                <div className="hidden lg:flex my-[24px] lg:mt-[36px] gap-3">
                  <svg
                    onClick={scrollDoctorsLeft}
                    className="arrow-button"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <rect width="60" height="60" rx="30" fill="#FF086F" />
                    <path
                      d="M27.57 23.9299L21.5 29.9999L27.57 36.0699"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M38.5 30H21.67"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    onClick={scrollDoctorsRight}
                    className="arrow-button"
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <rect
                      width="60"
                      height="60"
                      rx="30"
                      transform="matrix(-1 0 0 1 60 0)"
                      fill="#FF086F"
                    />
                    <path
                      d="M32.43 23.9299L38.5 29.9999L32.43 36.0699"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.5 30H38.33"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-full lg:w-[768px]">
                <div className="my-5 slide-container doctors sm-container-padding hide-scrollbar">
                  <div className="slide-wrapper five-slides doctors ">
                    {doctors?.map(
                      (
                        doctor: {
                          id: string;
                          attributes: {
                            firstName: string;
                            lastName: string;
                            profession: string;
                            avatar: { data: { attributes: { url: string } } };
                          };
                        },
                        index: number
                      ) => {
                        return (
                          <div
                            key={index}
                            className="slide doctors doctor-card md:min-w-[376px]"
                          >
                            <Image
                              loader={imageLoader}
                              alt="doctor"
                              src={
                                doctor?.attributes?.avatar?.data?.attributes
                                  ?.url
                              }
                              fill
                            />{" "}
                            <div className="doctor-card_footer md:grid md:grid-cols-5">
                              {" "}
                              <div className="md:col-span-3">
                                <div className="name">
                                  {doctor?.attributes?.firstName}{" "}
                                  {doctor?.attributes?.lastName}
                                </div>
                                <div className="title">
                                  {doctor?.attributes?.profession}
                                </div>
                              </div>
                              <div className="md:col-span-2">
                                <Link href={"/doctor-profile?id=" + doctor?.id}>
                                  <button>Book</button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="container-padding my-[24px] lg:mt-[36px] flex gap-3 lg:hidden">
                <svg
                  onClick={scrollDoctorsLeft}
                  className="arrow-button"
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <rect width="60" height="60" rx="30" fill="#FF086F" />
                  <path
                    d="M27.57 23.9299L21.5 29.9999L27.57 36.0699"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M38.5 30H21.67"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  onClick={scrollDoctorsRight}
                  className="arrow-button"
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <rect
                    width="60"
                    height="60"
                    rx="30"
                    transform="matrix(-1 0 0 1 60 0)"
                    fill="#FF086F"
                  />
                  <path
                    d="M32.43 23.9299L38.5 29.9999L32.43 36.0699"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5 30H38.33"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3 md:my-0 bg-[#FF9EC4] sm-container-padding">
          <div className="pt-2 pb-[40px] md:py-[129px] md:px-[132px]">
            <p data-aos="fade-up" className="hero-heading my-4 mb-6">
              HOW TO GET HELP AND SPEAK TO A PROFESSIONAL
            </p>
            <div className="collage">
              <div className="left">
                <div data-aos="fade-up" className="large bg-[#FB5B46]">
                  <div className="container-padding text">
                    <p>01</p>
                    <p>Search</p>
                    <span>
                      Search through our platform with a robust range of medical
                      professionals
                    </span>
                  </div>
                  <div className="image">
                    <Image alt="doctor" src="/images/usman-yousaf.png" fill />
                  </div>
                </div>
                <div data-aos="fade-up" className="small bg-[#E4394D]">
                  <div className="container-padding text">
                    <p>02</p>
                    <p>Login</p>
                    <span>
                      Create an account on our platform and you can decide to be
                      anonymous or have a user profile.
                    </span>
                  </div>
                </div>
              </div>
              <div className="right">
                <div data-aos="fade-up" className="small bg-[#FF2771]">
                  <div className="container-padding text">
                    <p>03</p>
                    <p>Book</p>
                    <span>
                      Discover and reserve appointments with a diverse range of
                      medical professionals seamlessly
                    </span>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  className="large bg-[#FB5B46] md:bg-[#FF4D93]"
                >
                  <div className="container-padding text">
                    <p>04</p>
                    <p>Help</p>
                    <span>
                      Get the assistance and support you need from our dedicated
                      team to make the most of our platform.
                    </span>
                  </div>
                  <div className="image">
                    <Image alt="doctor" src="/images/infant--2.png" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm-container-padding">
          <div className="bg-lighter py-8 rounded-lg md:rounded-none">
            <div
              data-aos="fade-up"
              className="container-padding md:py-[80px] flex flex-col md:flex-row md:justify-between"
            >
              <div className="w-full md:w-[45%] md:pr-[40px]">
                <h3 className="h3">
                  A platform approved by mothers and intending mothers.
                </h3>
              </div>
              <div className="w-full md:w-1/2">
                <p>
                  We are a group of individuals committed to providing products,
                  services, and resources  that ensure women experience maximum
                  health and wellness stability especially concerning fertility.
                </p>
              </div>
            </div>
            <div className="my-5 slide-container container-padding">
              <div className="slide-wrapper ten-slides horizontal-scrolling-items">
                <div className="slide horizontal-scrolling-items__item">
                  <Image alt="infant" src="/images/infant-4.png" fill />{" "}
                </div>
                <div className="slide bg-[#FF086F] rounded-lg container-padding py-3 flex flex-col justify-between text-white horizontal-scrolling-items__item">
                  <p className="text-xl">
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </p>
                  <p className="text-2xl font-semibold">Anonymous</p>
                </div>
                <div className="slide horizontal-scrolling-items__item">
                  <Image alt="infant" src="/images/infant.png" fill />
                </div>
                <div className="slide bg-[#FB5B46] rounded-lg container-padding py-3 flex flex-col justify-between text-white horizontal-scrolling-items__item">
                  <p className="text-xl">
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </p>
                  <p className="text-2xl font-semibold">Anonymous</p>
                </div>
                <div className="slide horizontal-scrolling-items__item">
                  <Image alt="infant" src="/images/infant-2.png" fill />
                </div>
                <div className="slide horizontal-scrolling-items__item">
                  <Image alt="infant" src="/images/infant-4.png" fill />{" "}
                </div>
                <div className="slide bg-[#FF086F] rounded-lg container-padding py-3 flex flex-col justify-between text-white horizontal-scrolling-items__item">
                  <p className="text-xl">
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </p>
                  <p className="text-2xl font-semibold">Anonymous</p>
                </div>
                <div className="slide horizontal-scrolling-items__item">
                  <Image alt="infant" src="/images/infant.png" fill />
                </div>
                <div className="slide bg-[#FB5B46] rounded-lg container-padding py-3 flex flex-col justify-between text-white horizontal-scrolling-items__item">
                  <p className="text-xl">
                    LILY Health empowers women and couples with tailored, safe,
                    and accessible fertility treatments, focusing on
                    compassionate care and patient-centered strategies.
                  </p>
                  <p className="text-2xl font-semibold">Anonymous</p>
                </div>
                <div className="slide horizontal-scrolling-items__item">
                  <Image alt="infant" src="/images/infant-2.png" fill />
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
