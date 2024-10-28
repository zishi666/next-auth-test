"use client";

import Auth_Testing from "./auth-testing/page";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <>
      <SessionProvider>
        <Auth_Testing />
      </SessionProvider>
    </>
  );
}
