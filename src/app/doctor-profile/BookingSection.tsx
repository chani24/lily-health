import styles from "./doctors.module.css";
import { Key, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";

import formatDate from "../_lib/formatDate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import { linstance } from "../_lib/api";
import { useForm } from "react-hook-form";
import { UserContext } from "../_lib/context/user";

function getDayOfWeekFromISODateString(inputDate: Date) {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfWeekIndex = date.getDay();

  return daysOfWeek[dayOfWeekIndex];
}

export default function BookingSection(props: any) {
  const [mobileTab, setMobileTab] = useState(1);
  const { createBooking, id } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    if (!id && !values.email) {
      setMobileTab(3);
    } else {
      values.date = resources[activeTime[0]].date;
      values.time = resources[activeTime[0]].times[activeTime[1]];
      values.dateString = resources[activeTime[0]].dateString;
      values.inPerson = inPerson;
      values.doctor = props.doctorId;
      values.user = id;
      setIsSubmitting(true);

      const ret = await createBooking(values);

      if (ret[0] === "alert") {
        toast.error(ret[1]);
      } else {
        toast.success(ret[1]);
        reset();
        closeModal();
      }
      setIsSubmitting(false);
    }
  };

  const onSubmitPc = async (values: any) => {
    if (!id && !values.email) {
      openPcModal();
    } else {
      values.date = resources[activeTime[0]].date;
      values.time = resources[activeTime[0]].times[activeTime[1]];
      values.dateString = resources[activeTime[0]].dateString;
      values.inPerson = inPerson;
      values.doctor = props.doctorId;
      values.user = id;
      setIsSubmitting(true);

      const ret = await createBooking(values);

      if (ret[0] === "alert") {
        toast.error(ret[1]);
      } else {
        toast.success(ret[1]);
        reset();
        closePcModal();
      }
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    linstance
      .get("/api/schedule")
      .then((res) => {
        const dates = res.data.data;

        let parsedAvailableTimes: any[] = [];

        dates.forEach((date: { times: []; date: any }) => {
          const newDate = {
            times: [""],
            isOpen: false,
            date: "",
            dateString: "",
          };
          newDate.times = date.times;
          newDate.dateString = `${getDayOfWeekFromISODateString(
            date.date
          )} ${formatDate(date.date)}`;
          newDate.date = date.date;
          parsedAvailableTimes.push(newDate);
        });

        setResources(parsedAvailableTimes);
      })
      .catch((e) => {});
  }, []);

  const [resources, setResources] = useState([
    {
      date: "",
      dateString: "",
      isOpen: false,
      times: ["0"],
    },
  ]);
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [pcModalIsOpen, setPcModal] = useState(false);
  const modalStyle = {
    content: {
      top: "100px",
      paddingLeft: "16px",
      paddingRight: "16px",
      right: "16px",
      borderRadius: "16px",
      zIndex: "30000",
      minWidth: "350px",
      maxWidth: "400px",
      left: "50%",
      WebkitTransform: "translateX(-50%)",
      transform: "translateX(-50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openPcModal() {
    setPcModal(true);
  }

  function closePcModal() {
    setPcModal(false);
  }

  return (
    <>
      <div className="w-full md:w-1/3">
        {!modalIsOpen && (
          <div className="z-40 bg-[#FDEFF0] fixed bottom-0 left-0 w-full md:hidden container-padding py-4 flex justify-between items-center">
            <div>
              <span className={styles.name + " mb-[-8px]"}>
                {formatDate(resources[activeTime[0]].date)}{" "}
                {resources[activeTime[0]].times[activeTime[1]]}
              </span>
              <p className={styles.p}>Next Available</p>
            </div>
            <button
              onClick={openModal}
              className={"button button-primary " + styles.btn}
            >
              Check Availability
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmitPc)} className="hidden md:block">
          <p className={styles.header + " mb-5"}>Available Sessions</p>
          <span className={"mt-[-8px] " + styles.p}>
            Schedule one-on-one sessions based on your preference. All times in
            GMT.
          </span>
          <div className="my-5 grid grid-cols-1 gap-3">
            {resources.map((resource, index) => {
              return (
                <div key={index} className={styles.outer_box + " flex-col"}>
                  <div
                    className={
                      "flex justify-between items-center " + styles.upper_div
                    }
                    onClick={() => toggleResource(index)}
                  >
                    <div>
                      <h4>{resource.dateString}</h4>
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
                      styles.resource +
                      " grid grid-cols-3 gap-x-3 resource_" +
                      index
                    }
                  >
                    {resource.times.map((time, id) => {
                      return (
                        <div
                          key={id}
                          onClick={() => chooseTime(index, id)}
                          className={
                            activeTime[0] === index && activeTime[1] === id
                              ? "col-span-1 bg-lighter mt-3 " + styles.inner_box
                              : "col-span-1 mt-3 " + styles.inner_box
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
            <div className="pt-2">
              <span className={styles.p}>Reason for Consultation</span>
              <div className="relative">
                <select {...register("title")} className={styles.select}>
                  <option value="Medical Consultancy">
                    Medical Consultancy
                  </option>
                  <option value="Medical Checkup">Medical Checkup</option>
                  <option value="Medical Advice">Medical Advice</option>
                </select>
                <svg
                  className={styles.select_icon}
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
              </div>
            </div>

            <div className="pt-2">
              <span className={styles.p}>Additional Comments </span>
              <textarea
                {...register("description")}
                className={styles.textarea}
                cols={20}
              ></textarea>
            </div>
          </div>
          <button
            className={
              "button button-primary " + styles.btn + " " + styles.btn_2
            }
          >
            {isSubmitting && "Loading..."}
            {!isSubmitting &&
              "Book Session for " +
                resources[activeTime[0]].times[activeTime[1]]}
          </button>
        </form>
      </div>
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Modal"
      >
        <form>
          <p className={styles.header + " mb-1"}>
            {mobileTab === 3 ? "Contact details" : "Available Sessions"}
          </p>
          <span className={"mt-[-8px] " + styles.p}>
            {mobileTab === 3
              ? "Provide contact details to complete booking"
              : "Schedule one-on-one sessions based on your preference. All times in GMT."}
          </span>
          <div className="my-5 grid grid-cols-1 gap-3">
            {mobileTab === 1 ? (
              <>
                {resources.map((resource, index) => {
                  return (
                    <div key={index} className={styles.outer_box + " flex-col"}>
                      <div
                        className={
                          "flex justify-between items-center " +
                          styles.upper_div
                        }
                        onClick={() => toggleResource(index)}
                      >
                        <div>
                          <h4>{resource.dateString}</h4>
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
                          styles.resource +
                          " grid grid-cols-3 gap-x-3 resource_" +
                          index
                        }
                      >
                        {resource.times.map((time, id) => {
                          return (
                            <div
                              key={id}
                              onClick={() => chooseTime(index, id)}
                              className={
                                activeTime[0] === index && activeTime[1] === id
                                  ? "col-span-1 bg-lighter mt-3 " +
                                    styles.inner_box
                                  : "col-span-1 mt-3 " + styles.inner_box
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
              </>
            ) : mobileTab === 2 ? (
              <>
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
                <div className="pt-2">
                  <span className={styles.p}>Reason for Consultation</span>
                  <div className="relative">
                    <select {...register("title")} className={styles.select}>
                      <option value="Medical Consultancy">
                        Medical Consultancy
                      </option>
                      <option value="Medical Checkup">Medical Checkup</option>
                      <option value="Medical Advice">Medical Advice</option>
                    </select>
                    <svg
                      className={styles.select_icon}
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
                  </div>
                </div>

                <div className="pt-2">
                  <span className={styles.p}>Additional Comments </span>
                  <textarea
                    {...register("description")}
                    className={styles.textarea}
                    cols={20}
                  ></textarea>
                </div>
              </>
            ) : (
              <>
                <div className="pt-2">
                  <span className={styles.p}>Name </span>
                  <input
                    {...register("name")}
                    className={styles.select}
                  ></input>
                </div>
                <div className="pt-2">
                  <span className={styles.p}>Email Address </span>
                  <input
                    {...register("email")}
                    className={styles.select}
                  ></input>
                </div>
              </>
            )}
          </div>
        </form>
        {mobileTab === 1 ? (
          <>
            <button
              type="button"
              onClick={() => setMobileTab(2)}
              className={
                "button button-primary " + styles.btn + " " + styles.btn_2
              }
            >
              Next
            </button>
          </>
        ) : mobileTab === 2 ? (
          <>
            <button
              onClick={handleSubmit(onSubmit)}
              className={
                "button button-primary " + styles.btn + " " + styles.btn_2
              }
            >
              {isSubmitting && "Loading..."}
              {!isSubmitting &&
                "Book Session for " +
                  resources[activeTime[0]].times[activeTime[1]]}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSubmit(onSubmit)}
              className={
                "button button-primary " + styles.btn + " " + styles.btn_2
              }
            >
              {isSubmitting && "Loading..."}
              {!isSubmitting && "Finish"}
            </button>
          </>
        )}

        {mobileTab === 1 ? (
          <button
            type="button"
            onClick={closeModal}
            className={
              "button button-primary-outline mt-5 " +
              styles.btn +
              " " +
              styles.btn_2
            }
          >
            Close
          </button>
        ) : mobileTab === 2 ? (
          <button
            type="button"
            onClick={() => setMobileTab(1)}
            className={
              "button button-primary-outline mt-5 " +
              styles.btn +
              " " +
              styles.btn_2
            }
          >
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMobileTab(2)}
            className={
              "button button-primary-outline mt-5 " +
              styles.btn +
              " " +
              styles.btn_2
            }
          >
            Back
          </button>
        )}
      </Modal>
      <Modal
        isOpen={pcModalIsOpen}
        onRequestClose={closePcModal}
        style={modalStyle}
        contentLabel="Modal"
      >
        <form>
          <p className={styles.header + " mb-1"}>Contact details</p>
          <span className={"mt-[-8px] " + styles.p}>
            Provide contact details to complete booking
          </span>
          <div className="my-5 grid grid-cols-1 gap-3">
            <div className="pt-2">
              <span className={styles.p}>Name </span>
              <input {...register("name")} className={styles.select}></input>
            </div>
            <div className="pt-2">
              <span className={styles.p}>Email Address </span>
              <input {...register("email")} className={styles.select}></input>
            </div>
          </div>
        </form>

        <button
          onClick={handleSubmit(onSubmitPc)}
          className={"button button-primary " + styles.btn + " " + styles.btn_2}
        >
          {isSubmitting && "Loading..."}
          {!isSubmitting && "Finish"}
        </button>

        <button
          type="button"
          onClick={closePcModal}
          className={
            "button button-primary-outline mt-5 " +
            styles.btn +
            " " +
            styles.btn_2
          }
        >
          Close
        </button>
      </Modal>
    </>
  );
}
