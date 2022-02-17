import React from "react";
import { Link } from "react-router-dom";
import Header from "@front/Header";
import Wrapper from "@layout/Wrapper";
import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p2.jpg";
import user3 from "@assets/images/p3.jpg";
import user4 from "@assets/images/p4.jpg";
import user5 from "@assets/images/p5.jpg";
import Switch from "../ui/switch";
function Setting() {
  return (
    <Wrapper className="p-4">
      <Header />

      <div>
        <div className="h-28  w-28  rounded-full p-1 ring-2 ring-pink-600 mx-auto my-4">
          <img
            src={user2}
            alt="user"
            className=" h-full w-full rounded-full object-cover "
          />
        </div>
        <p className="text-lg font-medium text-center">Anamika Singh</p>
        <p className="text-sm font-medium  text-center">Hustle 🔥</p>
        <div className="flex gap-2 w-max mx-auto my-2">
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Adventure
          </span>
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Riding
          </span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="my-4 ">
          <h4 className="font-medium ">General</h4>
          <div className=" my-2 flex flex-col gap-2">
            <div className="flex flex-col ">
              <label className="text-sm mb-1">Password</label>
              <input
                className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
                placeholder="Password"
              />
            </div>
          </div>
        </div>
        <div className="my-4 ">
          <h4 className="font-medium ">Prefrences</h4>
          <div className="flex items-center justify-between  my-2">
            <label className="text-sm mb-1">Email</label>
            <Switch name="email" />
          </div>
          <div className="flex items-center justify-between  my-2">
            <label className="text-sm mb-1">Private Account</label>
            <Switch name="account_type" />
          </div>
        </div>
      </div>
      <button className="p-2 px-4 ml-auto block bg-pink-600 text-white text-sm rounded my-4">
        Update
      </button>
    </Wrapper>
  );
}

export default Setting;
