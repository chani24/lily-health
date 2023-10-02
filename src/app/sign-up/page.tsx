"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserContext } from "../_lib/context/user";
import styles from "./signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "../_components/TopNav/TopNav";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const { doRegister, user, checkLogin } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = { current: "" };
  password.current = watch("password", "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);

    const ret = await doRegister(values);

    if (ret[0] === "alert") {
      toast.error(ret[1]);
    } else {
      toast.success("Account creation successful, kindly sign in" || ret[1]);
      reset();
      setTimeout(() => router.push("/login"), 3000);
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
            <h3 className="h3">Sign up</h3>
            <p>
              Ready to maximise your health and wellness stability? Join our
              platform today and experience wellness like never before.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div>
                <label>First Name*</label>
                <input
                  placeholder="Temitope"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <span className="error-message">
                    {errors?.firstName?.message?.toString()}
                  </span>
                )}
              </div>
              <div>
                <label>Last Name*</label>
                <input
                  placeholder="Aiyegbusi"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <span className="error-message">
                    {errors?.lastName?.message?.toString()}
                  </span>
                )}
              </div>
              <div>
                <label>Email Address*</label>
                <input
                  placeholder="adebimpeomolasho@gmail.com"
                  type="email"
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
              <div>
                <label>Password*</label>
                <input
                  placeholder="*******"
                  type="password"
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: { value: 8, message: "At least 8 characters" },
                  })}
                />
                {errors.password && (
                  <span className="error-message">
                    {errors?.password?.message?.toString()}
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
                  {!isSubmitting && "Sign up"}
                </button>
              </div>
            </form>

            <div className="text-center md:text-left">
              {" "}
              <span className="text-[#001433]">Already have an account? </span>
              <Link href="login">Sign in</Link>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
