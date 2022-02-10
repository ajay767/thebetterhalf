import React from "react";
import { Link } from "react-router-dom";
import profile from "@assets/images/friend-landing.jpg";
import { IoNotificationsSharp } from "react-icons/io5";
import Tippy from "@tippyjs/react";

function Header() {
  return (
    <div className="grid grid-cols-3 sticky bg-white z-[1000] top-0 py-2 ">
      <div className="  mt-2">
        <div className="relative w-max cursor-pointer">
          <IoNotificationsSharp size={28} />
          <span className="bg-pink-600 text-white flex items-center justify-center rounded-full h-5 w-5 text-xs absolute -top-2 right-0">
            4
          </span>
        </div>
      </div>
      <Link to="/home">
        <h1 className=" font-medium text-3xl text-center logo__text">
          Better<span className="text-pink-600">half</span>
        </h1>
      </Link>
      <div>
        <Tippy
          interactive
          arrow={false}
          trigger="mouseenter"
          delay={0}
          theme="light"
          className="!bg-transparent   "
          content={
            <div className="bg-[#2a2a2a] shadow-md w-36 p-0 rounded overflow-hidden">
              <Link
                to="/profile"
                className="text-sm px-4 p-2 block hover:bg-black text-white"
              >
                Profile
              </Link>
              <Link
                to="/notification"
                className="text-sm px-4 p-2 block hover:bg-black text-white"
              >
                Notification
              </Link>
              <Link
                to="/chat"
                className="text-sm px-4 p-2 block hover:bg-black text-white"
              >
                Message
              </Link>
              <Link
                to="/friends"
                className="text-sm px-4 p-2 block hover:bg-black text-white"
              >
                Friends
              </Link>
              <Link
                to="/home"
                className="text-sm px-4 p-2 block hover:bg-black text-white"
              >
                Setting
              </Link>
              <Link
                to="/login"
                className="text-sm px-4 p-2 block hover:bg-black text-white"
              >
                Logout
              </Link>
            </div>
          }
        >
          <img
            alt="user profile "
            src={profile}
            className="h-10 w-10 rounded-full object-cover ml-auto"
          />
        </Tippy>
      </div>
    </div>
  );
}

export default Header;
