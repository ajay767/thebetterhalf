import React from "react";
import { Link } from "react-router-dom";

function ForgetPassword() {
  return (
    <div className="bg-slate-100 p-4 min-h-screen  ">
      <div className="rounded-md w-full my-24 mx-auto md:w-96 p-4 bg-white shadow-md ">
        <h1 className=" font-medium text-3xl text-center logo__text">
          Better<span className="text-pink-600">half</span>
        </h1>
        <form className="flex flex-col gap-2 mt-8">
          <div className="flex flex-col ">
            <label className="text-sm mb-1">Email</label>
            <input
              className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
              placeholder="Email or Mobile"
            />
          </div>

          <button className="p-2 px-4 bg-pink-600 text-white text-sm rounded my-4">
            Next
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <a href="/" className="underline ">
            thebetterhalf.in
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
