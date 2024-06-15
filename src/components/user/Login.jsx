import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hidden, setHidden] = useState(false);

  const EyeButton = () => {
    setHidden(!hidden);
  };

  const RegisterPage = () => {
    router.push("/user/register");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };
  const ErrCrd = searchParams.get("error")?.replace("Error: ", "");
  return (
    <div
      className={`flex flex-col absolute items-center justify-center dark:text-white text-black ${className}`}
    >
      <h2 className="text-5xl p-2 mb-6">Login</h2>
      <h3>{ErrCrd}</h3>

      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <div className="border rounded-lg p-2 mb-2">
          <input
            className="w-60 h-10 focus:outline-none bg-transparent"
            placeholder="Email"
            type="text"
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
                Log In!
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
        <h2 className="text-lg mt-2 mr-2">Have'nt an account</h2>
        <button
          onClick={() => RegisterPage()}
          className="relative hover:text-[#778464] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0"
        >
          Register
        </button>
      </div>
      <h3 className="hover:underline text-lg">Forgot yout password?</h3>
    </div>
  );
};

export default Login;
