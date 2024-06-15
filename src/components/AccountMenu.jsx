"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdAdminPanelSettings, MdSettings } from "react-icons/md";
import {
  RiAccountPinBoxFill,
  RiLoginCircleLine,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Items = [
  {
    name: "Account",
    href: "/#1",
    key: "account",
    icon: <RiAccountPinBoxFill size="25px" />,
    isAuthenticated: true,
    role: ["admin", "member"],
  },
  {
    name: "Settings",
    href: "/#2",
    key: "settings",
    icon: <MdSettings size="25px" />,
    isAuthenticated: true,
    role: ["admin", "member"],
  },
  {
    name: "Management",
    href: "/user/management",
    key: "management",
    icon: <MdAdminPanelSettings size="25px" />,
    isAuthenticated: true,
    role: ["admin"],
  },
  // {
  //   name: "Log Out",
  //   href: "/api/auth/signout",
  //   key: "logout",
  //   icon: <RiLogoutCircleRLine size="25px" />,
  //   isAuthenticated: true,
  //   role: ["admin", "member"],
  // },
  {
    name: "Log In",
    href: "/user/login",
    key: "login",
    icon: <RiLoginCircleLine size="25px" />,
    isAuthenticated: false,
  },
];

import AOS from "aos";
import "aos/dist/aos.css";

const AccountMenu = ({ className, children, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const buttonRef = useRef();

  const session = useSession();

  useEffect(() => {
    window.addEventListener(
      "click",
      (e) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      },
      [buttonRef]
    );

    // console.log(session);
    // console.log("user", session.data?.user);
    // if (session.status === "loading") return setIsLoaded(true);

    // console.log("session clientSide", session);
    // console.log("girdi datası", data);

    if (session.status === "unauthenticated") {
      SetIsAuthenticated(false);
      setIsLoaded(true);
    }
    if (session.status === "authenticated") {
      setIsLoaded(true);
      SetIsAuthenticated(true);
    }
  });

  const handleAccountMenu = () => {
    setIsOpen(!isOpen);
  };

  // const authOptions = Items.filter((item) => item.isAuthenticated === true);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className={`flex flex-col ${className} z-50`}
      ref={buttonRef}
      data-aos="fade-down"
    >
      {isAuthenticated && session.data.user.image && (
        <Image
          className="rounded-full cursor-pointer"
          src={session.data.user.image}
          width={30}
          height={30}
          onClick={handleAccountMenu}
          alt="User Image"
        />
      )}
      {(!isAuthenticated || !session.data.user.image) && (
        <BiUserCircle
          className="cursor-pointer dark:text-white text-black"
          size="30"
          onClick={handleAccountMenu}
        />
      )}

      {!isLoaded
        ? isOpen && <div>Yükleniyor...</div>
        : isOpen && (
            <div
              className="absolute flex flex-col w-auto top-20 right-7 py-2 px-2 rounded-xl dark:bg-slate-900 bg-slate-400"
              data-aos="fade-down"
            >
              {Items.map(
                (item, i) =>
                  (isDevelopment
                    ? true
                    : /////if isAuthenticated is true, then check item.isAuthenticated
                    isAuthenticated
                    ? item.isAuthenticated === true &&
                      item.role.includes(session.data.user.role.toLowerCase())
                    : // Last
                      item.isAuthenticated === false) && (
                    // && (isAuthenticated ? item.isAuthenticated : false)
                    <Link
                      href={item.href}
                      key={item.key}
                      className="flex flex-row justify-between cursor-pointer p-3 rounded-lg font-semibold hover:border-lime-300 border-l-transparent border-b-transparent border-b-4 border-l-4"
                      data-aos="fade-down"
                    >
                      <h3 className="w-full mr-2">{item.name}</h3>
                      {item.icon}
                    </Link>
                  )
              )}
              {isAuthenticated && (
                <Link
                  href="/api/auth/logout"
                  className="flex flex-row justify-between cursor-pointer p-3 rounded-lg font-semibold hover:border-lime-300 border-l-transparent border-b-transparent border-b-4 border-l-4"
                  onClick={() => signOut()}
                >
                  <h3 className="w-full mr-2">Sign Out</h3>
                  <RiLogoutCircleRLine size="25px" />
                </Link>
              )}

              <div className="border-2 border-red-500 rounded-lg p-4 animate-pulse">
                <h1 className="text-lg font-bold">
                  {isAuthenticated
                    ? `Merhaba ${
                        session.data.user.firstname
                          ? session.data.user.firstname
                          : session.data.user.username
                      }`
                    : "Merhaba Kullanici"}
                </h1>
                <p className="">Bu bir test sitesi.</p>
              </div>
            </div>
          )}
      {data == "role" && session.data && (
        <span className="text-md font-semibold">{session.data.user.role}</span>
      )}
      {children}
    </div>
  );
};

export default AccountMenu;
