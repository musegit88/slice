"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
const ProvideSession = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ProvideSession;
