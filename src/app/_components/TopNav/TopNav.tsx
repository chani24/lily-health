"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./topnav.module.css";
import { useContext, useEffect, useState } from "react";
import gsap from "gsap";
import Search from "../Search";
import { UserContext } from "@/app/_lib/context/user";

export default function TopNav(props: {
  searchDropdown?: boolean;
  setSearchDropdown?: any;
}) {
  const [dropdown, setDropdown] = useState(false);
  const { doRegister, user, checkLogin } = useContext(UserContext);
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = async () => {
    const res = await checkLogin();
    if (res.status === 200) {
    }
  };

  const openDropdown = () => {
    closeNav(0.5);
    setDropdown(true);
    gsap.to(".search-dropdown", {
      height: "100vh",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  // Function to close the dropdown
  const closeDropdown = (delay: number = 0.5) => {
    setDropdown(false);
    if (props.setSearchDropdown) props.setSearchDropdown(false);
    gsap.to(".search-dropdown", {
      height: 0,
      duration: 0.5,
      delay,
      ease: "power2.inOut",
    });
  };

  const [nav, setNav] = useState(false);
  const openNav = () => {
    closeDropdown(0.5);
    setNav(true);
    gsap.to("." + styles.dropdown_wrapper, {
      height: "100vh",
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const closeNav = (delay: number = 0.5) => {
    setNav(false);
    gsap.to("." + styles.dropdown_wrapper, {
      height: 0,
      duration: 0.5,
      delay,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="relative bg-white">
      <div className={"container-padding " + styles.top_nav}>
        <div className="flex items-center">
          {nav ? (
            <svg
              onClick={() => closeNav()}
              width="24"
              height="23"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="2.37972"
                height="29.7465"
                transform="translate(1.2832 1.75821) rotate(-45)"
                fill="white"
              />
              <rect
                width="2.37972"
                height="29.7465"
                transform="translate(21.0339 0.20784) rotate(45)"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              onClick={openNav}
              width="24"
              height="11"
              viewBox="0 0 24 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="24"
                height="2"
                transform="translate(0 0.5)"
                fill="white"
              />
              <rect
                width="24"
                height="2"
                transform="translate(0 4.5)"
                fill="white"
              />
              <rect
                width="24"
                height="2"
                transform="translate(0 8.5)"
                fill="white"
              />
            </svg>
          )}
          <Link href="/" className="text-white ms-5 md:text-2xl font-medium">
            <Image
              className={styles.logo}
              alt="lily logo"
              src="/logo.svg"
              width={32.64}
              height={17.973}
            />
          </Link>
        </div>
        <div className="flex items-center">
          {user && <div className="text-white me-4">Hi, {user}</div>}
          {props.searchDropdown || dropdown ? (
            <div onClick={() => closeDropdown()} className={styles.search_bar}>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="2"
                  height="25"
                  transform="translate(1.07861 1.41431) rotate(-45)"
                  fill="#FF086F"
                />
                <rect
                  width="2"
                  height="25"
                  transform="translate(17.6777 0.111328) rotate(45)"
                  fill="#FF086F"
                />
              </svg>
            </div>
          ) : (
            <div onClick={openDropdown} className={styles.search_bar}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="#FF086F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="#FF086F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {!user && (
            <Link href="/login">
              <button className="button button-light ms-5 hidden md:block">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <Search className="search-dropdown" />
      <div className={styles.dropdown_wrapper}>
        <div className={"container-padding " + styles.top_nav__dropdown}>
          <div className="md:hidden">
            <Link href="/login">Login</Link>
          </div>
          <div>
            <Link href="/about-us">About Us</Link>
          </div>
          <div>
            <Link href="/services">Our Services</Link>
          </div>
          <div>
            <Link href="/doctors">Doctors</Link>
          </div>
          <div>
            <Link href="/gallery">Gallery</Link>
          </div>
          <div>
            <Link href="/resource-center">Resources</Link>
          </div>
          <div>
            <Link href="/support">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
