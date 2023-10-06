"use client";

import styles from "./page.module.css";

import TopNav from "../_components/TopNav/TopNav";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../_lib/context/user";

export default function Remind() {
  const router = useRouter();
  const { doRemind, user, checkLogin } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);

    const ret = await doRemind(values);

    if (ret[0] === "alert") {
      toast.error(ret[1]);
    } else {
      toast.success(ret[1]);
      reset();
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const res = await checkLogin();
      if (res.status === 200) {
      }
    };
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <>
      <TopNav />
      <main>
        <div className={styles.container}>
          <div className={"container-padding " + styles.left}>
            <h3 className="h3">Forgot password</h3>
            <p>
              Ready to maximise your health and wellness stability? Join our
              platform today and experience wellness like never before.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div>
                <label>Email Address*</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && (
                  <span className="error-message">
                    {errors?.email?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="my-7 max-w-3xl">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary w-full inverse-size-button"
                >
                  {isSubmitting && "Loading..."}
                  {!isSubmitting && "Send link"}
                </button>
              </div>
            </form>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>{" "}
      <ToastContainer />
    </>
  );
}
