"use client";

import { linstance } from "../api";

import { useState, createContext, useEffect } from "react";
export const UserContext = createContext({
  user: null,
  setUser: (user) => {},
  email: null,
  setEmail: (email) => {},
  id: null,
  setId: (id) => {},
  checkLogin: () => {
    const res = {
      data: {
        user: "",
        email: "",
        id: "",
      },
      status: 0,
    };

    return res;
  },
  doRegister: (values) => ["", ""],
  createBooking: (values) => ["", ""],
  doLogin: (values) => {
    const res = {
      alert: ["", ""],
      message: {
        username: "",
      },
    };
    return res;
  },
  doLogout: () => {
    const res = {
      data: {
        message: "",
      },
    };
    return res;
  },
  doRemind: (values) => ["", ""],
  doReset: (values) => ["", ""],
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

  async function createBooking(values) {
    try {
      const resp = await linstance.post("/api/booking", values);
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
      const res = {
        alert: ["", ""],
        message: resp.data.message,
      };
      return res;
    } catch (error) {
      const res = {
        alert: ["alert", error.response.data.message],
        message: null,
      };
      return res;
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
    createBooking,
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
