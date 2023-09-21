import styles from "./page.module.css";

import type { Metadata } from "next";
import TopNav from "../_components/TopNav/TopNav";

export const metadata: Metadata = {
  title: "Lily Health - New password",
};

export default function Login() {
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

            <form className="form">
              <div>
                <label>New Password*</label>
                <input placeholder="*******" type="password" name="password" />
              </div>
              <div>
                <label>Confirm New Password*</label>
                <input placeholder="*******" type="password" name="password" />
              </div>
            </form>

            <div className="my-7 max-w-3xl">
              <button className="button button-primary w-full inverse-size-button">
                Set password
              </button>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>{" "}
    </>
  );
}
