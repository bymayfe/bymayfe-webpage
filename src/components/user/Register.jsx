import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { register } from "@/libraries/Register";
import { signIn, getCsrfToken } from "next-auth/react";
// import { csrfToken } from 'next-auth/react'

const Register = ({ className }) => {
  const router = useRouter();
  // const csrfToken = getCsrfToken();

  const [hidden, setHidden] = useState(false);
  // const [error, setError] = useState(null);
  const [error, setError] = useState("It's still too early");
  const [success, setSuccess] = useState(false);

  const EyeButton = () => {
    setHidden(!hidden);
  };
  const signInPage = () => {
    router.push("/user/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    return; // Remove this line to enable registration
    const firstname = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    const obj = {
      firstname,
      lastname,
      email,
      password,
    };
    // console.log("csrfToken", csrfToken);
    const res = await register(obj);
    if (res.error) setError(res.error);
    // return;
    if (res.success) {
      setSuccess(true);
      signIn("credentials", { email, password });
    }
  };

  return (
    <div
      className={`flex flex-col absolute items-center justify-center dark:text-white text-black ${className}`}
    >
      <h2 className="text-5xl p-2 mb-6">Register</h2>

      {!success && error && (
        <h3 className="font-bold text-red-500 mb-2 text-lg">{error}</h3>
      )}
      {success && (
        <h3 className="font-bold text-green-500 mb-2 text-lg">
          Success! Wait for redirecting...
        </h3>
      )}

      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-row mb-2">
          <div className="rounded-lg border py-2 px-3 mr-2">
            <input
              className="w-28 h-10 focus:outline-none bg-transparent"
              placeholder="Firstname"
              type="text"
              required
            />
          </div>
          <div className="rounded-lg border py-2 px-3">
            <input
              className="w-28 h-10 focus:outline-none bg-transparent"
              placeholder="Lastname"
              type="text"
              required
            />
          </div>
        </div>
        <div className="border rounded-lg py-2 px-3 mb-2">
          <input
            className="w-64 h-10 focus:outline-none bg-transparent"
            placeholder="Email"
            type="email"
            required
          />
        </div>
        <div className="flex items-center justify-center flex-row border rounded-lg p-2 mb-2">
          <input
            className="w-60 h-10 focus:outline-none bg-transparent"
            placeholder="Password"
            type={hidden ? "text" : "password"}
            required
          />
          {hidden ? (
            <FaEyeSlash
              size={25}
              className="hover:bg-slate-600 rounded-full duration-300"
              onClick={() => EyeButton()}
            />
          ) : (
            <FaEye
              size={25}
              className="hover:bg-slate-600 rounded-full duration-300"
              onClick={() => EyeButton()}
            />
          )}
        </div>
        <div className="flex flex-row">
          <div className="border rounded-lg p-2 mr-2">
            <button
              className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group/button"
              type="submit"
            >
              I'm Ready
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover/button:scale-x-100 transition-transform group-hover/button:duration-500 duration-1000 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover/button:scale-x-100 transition-transform group-hover/button:duration-700 duration-700 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover/button:scale-x-50 transition-transform group-hover/button:duration-1000 duration-500 origin-left"></span>
              <span className="group-hover/button:opacity-100 group-hover/button:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                Register!
              </span>
            </button>
          </div>
          <button
            className="cursor-not-allowed relative group overflow-hidden border-2 px-8 py-2 border-green-500 rounded-lg"
            type="button"
          >
            <span className="font-bold text-lg relative z-10 group-hover:text-green-500 duration-500">
              Spotify
            </span>
            <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
            <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>

            <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
            <span className="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
          </button>
        </div>
      </form>
      <div className="flex flex-row">
        <h2 className="text-lg mt-2 mr-2">Have an account ?</h2>
        <button
          onClick={() => signInPage()}
          className="relative hover:text-[#778464] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Register;
