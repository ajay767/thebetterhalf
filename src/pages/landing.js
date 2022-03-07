import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import friend from '@assets/images/friend-landing.jpg';
import { Link } from 'react-router-dom';

function Landing() {
  useEffect(() => {
    document.title = 'Find your better half';
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
            <h4 className=" text-lg md:text-base text-gray-700 mb-8 w-11/12 md:w-10/12">
              <span className="text-2xl font-medium mb-2 block">
                Simple, Secure, Reliable messaging.
              </span>
              Betterhalf is more than a messaging and social media application,
              it let you connect to your better half.
              <span className="text-xs text-gray-400 block mt-2">
                Data charges may apply. Contact your provider for details.
              </span>
            </h4>
          </div>
          <div className="shadow-md p-2 pl-4 bg-white rounded-md flex items-center w-11/12 md:w-[440px]">
            <input
              disabled
              className=" text-sm md:text-base text-gray-700 flex-grow border-0 outline-none"
              placeholder="Find Your Friends"
            />
            <Link to="/home">
              <button className="flex-shrink-0  border-0 ring-0 active:bg-pink-700 bg-pink-600 text-white text-sm  p-2 px-4 rounded-md">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{' '}
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
