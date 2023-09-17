import Link from "next/link";

import styles from "./login.module.css";

import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";

export const metadata: Metadata = {
  title: "Lily Health - Sign In",
};

export default function Login() {
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

            <form className="form">
              <div>
                <label>Email Address*</label>
                <input placeholder="adebimpeomolasho@gmail.com" name="email" />
              </div>
              <div>
                <label>Password*</label>
                <input placeholder="*******" type="password" name="password" />
              </div>
            </form>
            <div className="text-right hidden md:block md:mt-[-20px]">
              {" "}
              <Link href="sign-up">
                <span className="text-[#666B73]">Forgot password?</span>
              </Link>
            </div>
            <div className="my-7 max-w-3xl">
              <button className="button button-primary w-full inverse-size-button">
                Sign in
              </button>
            </div>
            <div className="text-center md:text-left">
              {" "}
              <span className="text-[#001433]">Don’t have an account? </span>
              <Link href="sign-up">Sign up</Link>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>{" "}
    </>
  );
}
