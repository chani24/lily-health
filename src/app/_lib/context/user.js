"use client";

import { linstance } from "../api";

import { useState, createContext, useEffect } from "react";
export const UserContext = createContext({
  dummy: null,
  setDummy: null,
  dummyfunction: null,
  doRegister: (values) => ["", ""],
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  async function doRegister(values) {
    try {
      const resp = await linstance.post("/api/sign-up", values);
      return ["OK", resp.data.message];
    } catch (error) {
      console.log(error);
      return ["alert", error.response.data.message];
    }
  }

  async function checkLogin() {
    try {
      const resp = await linstance.get("/api/user");
      setUser(resp.data.user);
      setEmail(resp.data.email);
      setId(resp.data.id);
      return resp;
    } catch (error) {
      return error.response;
    }
  }

  async function doLogin(values) {
    try {
      const resp = await linstance.post("/api/login", values);
      return resp.data;
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }

  const doLogout = async () => {
    const resp = await linstance.post("/api/auth/logout", {
      method: "POST",
    });
    if (resp.data.message == "success") {
      setUser("");
      setEmail("");
      setId("");
    }
  };

  async function doRemind(values) {
    try {
      const resp = await linstance.post("/api/reminder", values);
      return ["OK", resp.data.message];
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }

  async function doReset(values) {
    try {
      const resp = await linstance.post("/api/reset", values);
      return ["OK", resp.data.message];
    } catch (error) {
      return ["alert", error.response.data.message];
    }
  }

  const useract = {
    user,
    setUser,
    email,
    setEmail,
    id,
    setId,
    checkLogin,
    doRegister,
    doLogin,
    doLogout,
    doRemind,
    doReset,
  };

  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
