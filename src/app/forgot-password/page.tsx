import Link from "next/link";

import styles from "./page.module.css";

import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";

export const metadata: Metadata = {
  title: "Lily Health - Reset password",
};

export default function Login() {
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

            <form className="form">
              <div>
                <label>Email Address*</label>
                <input placeholder="adebimpeomolasho@gmail.com" name="email" />
              </div>
            </form>
            <div className="my-7 max-w-3xl">
              <button className="button button-primary w-full inverse-size-button">
                Send reset link
              </button>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>{" "}
    </>
  );
}
