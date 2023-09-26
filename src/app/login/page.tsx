"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserContext } from "../_lib/context/user";
import styles from "./login.module.css";

import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Lily Health - Sign In",
};

export default function Login() {
  const router = useRouter();
  const { doLogin, setUser, user, checkLogin } = useContext(UserContext);
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
  const [alert, setAlert] = useState(["", ""]);

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);

    const ret = await doLogin(values);

    if (ret[0] === "alert") {
      toast.error(ret[1]);
    } else {
      toast.success("Signed in");
      setUser(ret.message.username);
      setTimeout(() => router.push("/doctors"), 3000);
      reset();
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = async () => {
    const res = await checkLogin();
    if (res.status === 200) {
    }
  };

  if (user) {
    router.push("/doctors");
  }

  return (
    <>
      <TopNav />
      <main>
        <div className={styles.container}>
          <div className={"container-padding " + styles.left}>
            <h3 className="h3">Sign in</h3>
            <p>
              Ready to maximise your health and wellness stability? Join our
              platform today and experience wellness like never before.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div>
                <label>Email Address*</label>
                <input
                  placeholder="adebimpeomolasho@gmail.com"
                  {...register("identifier", {
                    required: true,
                  })}
                />
                {errors.identifier && (
                  <span className="error-message">
                    {errors?.identifier?.message?.toString()}
                  </span>
                )}
              </div>
              <div>
                <label>Password*</label>
                <input
                  placeholder="*******"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Email address is required",
                  })}
                />
                {errors.password && (
                  <span className="error-message">
                    {errors?.password?.message?.toString()}
                  </span>
                )}
              </div>
              <div className="text-right mt-[-20px]">
                {" "}
                <Link href="forgot-password">
                  <span className="text-[#666B73]">Forgot password?</span>
                </Link>
              </div>
              <div className="my-7 max-w-3xl">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary w-full inverse-size-button"
                >
                  {isSubmitting && "Loading"}
                  {!isSubmitting && "Sign in"}
                </button>
              </div>
            </form>

            <div className="text-center md:text-left">
              {" "}
              <span className="text-[#001433]">Don’t have an account? </span>
              <Link href="sign-up">Sign up</Link>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>{" "}
      <ToastContainer />
    </>
  );
}
