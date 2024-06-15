"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import MainCredant from "@/components/user/MainCredant";
import Login from "@/components/user/Login";

const Page = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") return router.push("/");

  return (
    session.status === "unauthenticated" && (
      <div className="flex items-center justify-center w-full h-full dark:bg-[#111]">
        <MainCredant className="z-0">
          <Login className="z-10" />
        </MainCredant>
      </div>
    )
  );
};

export default Page;
