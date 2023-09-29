"use client";

import styles from "./page.module.css";

import TopNav from "../_components/TopNav/TopNav";
import { useForm } from "react-hook-form";
import { UserContext } from "../_lib/context/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { doReset, user, checkLogin } = useContext(UserContext);
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
    values.code = searchParams.get("code");
    setIsSubmitting(true);
    const ret = await doReset(values);

    if (ret[0] === "alert") {
      toast.error(ret[1]);
    } else {
      toast.success(ret[1]);
      reset();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
    router.push("/profile");
  }

  return (
    <>
      <TopNav />
      <main>
        <div className={styles.container}>
          <div className={"container-padding " + styles.left}>
            <h3 className="h3">Choose a new password</h3>
            <p>
              Ready to maximise your health and wellness stability? Join our
              platform today and experience wellness like never before.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div>
                <label>New Password*</label>
                <input
                  placeholder="*******"
                  type="password"
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: { value: 8, message: "At least 8 character" },
                  })}
                />
                {errors.password && (
                  <span className="error-message">
                    {errors?.password?.message?.toString()}
                  </span>
                )}
              </div>
              <div>
                <label>Confirm New Password*</label>
                <input
                  placeholder="*******"
                  type="password"
                  {...register("passwordConfirmation", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                {errors.passwordConfirmation && (
                  <span className="error-message">
                    {errors?.passwordConfirmation?.message?.toString()}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button button-primary w-full inverse-size-button"
              >
                {isSubmitting && "Loading..."}
                {!isSubmitting && "Reset"}
              </button>
            </form>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>{" "}
      <ToastContainer />
    </>
  );
}
