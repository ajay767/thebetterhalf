import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="bg-slate-100 p-4 min-h-screen  ">
      <div className="rounded-md w-full my-24 mx-auto md:w-96 p-4 bg-white shadow-md ">
        <h1 className=" font-medium text-3xl text-center logo__text">
          Better<span className="text-pink-600">half</span>
        </h1>
        <form className="flex flex-col gap-4 mt-8 mb-4">
          <div className="flex flex-col ">
            <label className="text-sm mb-1">Username</label>
            <input
              className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-sm mb-1">Email</label>
            <input
              className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
              placeholder="Email or Mobile"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1">Password</label>
            <input
              type="password"
              className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="h-4 w-4 text-pink-600 rounded-sm mr-2 outline-none ring-0"
              type="checkbox"
              id="terms_condition"
            />
            <label htmlFor="terms_condition" className="text-gray-700 text-xs">
              Agree to terms and condition.
            </label>
          </div>
          <button className="p-2 px-4 bg-pink-600 text-white text-sm rounded mt-4 mb-2">
            Sign up
          </button>
        </form>
        <p className="text-sm text-center mb-2">
          <Link to="/login">Already have an account, sign in instead</Link>
        </p>
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

export default Signup;
