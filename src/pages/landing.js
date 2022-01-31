import React, { useEffect } from "react";
import friend from "@assets/images/friend-landing.jpg";

function Landing() {
  useEffect(() => {
    document.title = "Find your better half";
  }, []);
  return (
    <div className="min-h-screen grid md:grid-cols-12">
      <div className="md:col-span-6 p-4 md:p-10 flex flex-col justify-between">
        <p className="logo__text text-2xl md:text-3xl text-gray-700">
          Better<span className="text-pink-600">half</span>
        </p>
        <div className="md:mb-24">
          <div className="mb-10 ">
            <h1 className="text-gray-700  text-4xl md:text-5xl font-bold mb-4">
              Find Your Better Half 😍
            </h1>
            <h4 className=" text-sm md:text-base text-gray-700 mb-8 w-11/12 md:w-10/12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              placeat sequi optio assumenda accusantium commodi, reiciendis
              consequuntur inventore, perspiciatis a temporibus id iure.
              Doloribus aut quas sapiente quod iste sit.
            </h4>
          </div>
          <div className="shadow-md p-2 pl-4 bg-white rounded-md flex items-center w-11/12 md:w-[440px]">
            <input
              className=" text-sm md:text-base text-gray-700 flex-grow border-0 outline-none"
              placeholder="Enter your email"
            />
            <button className="flex-shrink-0  border-0 ring-0 active:bg-pink-700 bg-pink-600 text-white text-sm  p-2 px-4 rounded-md">
              Get Notified
            </button>
          </div>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{" "}
            <a href="/" className="underline ">
              thebetterhalf.in
            </a>
          </p>
        </div>
      </div>
      <div className="md:col-span-6 relative">
        <img
          src={friend}
          alt="Two people holding hand"
          className="h-full w-full absolute top-0 bottom-0 left-0 right-0 object-cover object-center "
        />
      </div>
    </div>
  );
}

export default Landing;
