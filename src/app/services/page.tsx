"use client";
import Footer from "../_components/Footer/Footer";

import styles from "./service.module.css";
//import type { Metadata } from 'next'
import { useEffect, useState } from "react";
import gsap from "gsap";
import TopNav from "../_components/TopNav/TopNav";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ResourceCenter() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  const [resources, setResources] = useState([
    {
      title: "Medical Consultations",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
    {
      title: "Wellness Programs",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
    {
      title: "Home Healthcare",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
    {
      title: "Pharmacy Services",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
    {
      title: "Health Education",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
    {
      title: "Pediatric Care",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
    {
      title: "Health Screenings",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
    {
      title: "Health Technology",
      description:
        "Our goal is to revolutionise the fertility solutions market by fostering empathy, inclusivity, and support, aiming to provide hope and joy for women, young adults, and couples. We are a group of individuals committed to turning the tide on disease and giving people the knowledge, tools and understanding they deserve so they can dictate their own health and happiness. ",
      isOpen: false,
    },
  ]);

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

  return (
    <>
      <TopNav />
      <main>
        <div className="bg-lighter md:bg-[#fff] py-8 rounded-lg md:rounded-none mt-3 md:mt-0 container-padding">
          <div
            data-aos="fade-up"
            className="md:py-[80px] flex flex-col md:flex-row md:justify-between"
          >
            <div className="w-full md:w-[45%] md:pr-[30px]">
              <h1 className={styles.header}>Services we offer</h1>
            </div>
            <div className="w-full md:w-1/2">
              <p>
                Lily health, established in 2021 , was created with the aim to
                provide products, services, and resources that ensure women
                experience maximum health and wellness stability especially
                concerning fertility.
              </p>
            </div>
          </div>
        </div>
        <div className="container-padding mt-3 grid grid-cols-1 gap-3 md:px-[148px]">
          {resources.map((resource, index) => {
            return (
              <div
                data-aos="fade-up"
                key={index}
                className={styles.resource_container + " bg-light"}
              >
                <div
                  onClick={() => toggleResource(index)}
                  className={
                    "flex justify-between items-center " + styles.upper_div
                  }
                >
                  <div>
                    <h4>{resource.title}</h4>
                  </div>
                  <div>
                    {resource.isOpen ? (
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 24H38"
                          stroke="#FF086F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 6.66666V25.3333"
                          stroke="#FF086F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.66699 16H25.3337"
                          stroke="#FF086F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className={styles.resource + " resource_" + index}>
                  <span>{resource.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
