import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Wrapper from "@layout/Wrapper";
import Header from "@front/Header";
import user2 from "@assets/images/p2.jpg";
import user4 from "@assets/images/p4.jpg";
import user3 from "@assets/images/p3.jpg";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import Tippy from "@tippyjs/react";
import FriendRequest from "./request";

export function FriendListCard({ name, verified, photo, request }) {
  return (
    <div className="mb-2 flex gap-2 items-stretch">
      <img
        className="w-12 h-12  rounded-md  object-cover"
        src={photo}
        alt="user"
      />
      <div className="text-sm ">
        <h4 className="font-medium flex items-center  ">
          {name}{" "}
          {verified && (
            <span className="text-pink-600 ml-2 ">
              <IoCheckmarkDoneCircle size={24} />
            </span>
          )}
        </h4>
        <p>Hustle 🔥</p>
      </div>
      {request && (
        <div className="ml-auto flex gap-2 items-center r">
          <p className="p-2 hover:bg-pink-600 hover:text-white cursor-pointer  ring-1 ring-pink-600 text-xs rounded-full">
            <GiCheckMark size={16} />
          </p>
          <p className="p-2 hover:bg-pink-600 hover:text-white cursor-pointer  ring-1 ring-pink-600 text-xs rounded-full">
            <BsPlusLg size={16} className="transform rotate-45 " />
          </p>
        </div>
      )}
    </div>
  );
}

function FriendList() {
  return (
    <div>
      <FriendListCard name="Shruti Singh" photo={user2} verified />
      <FriendListCard name="Anjali Yadav" photo={user4} />
      <FriendListCard name="Kiran bhadoriya" photo={user3} />
    </div>
  );
}

function Friends() {
  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <div className="flex text-sm  mb-2">
        <NavLink
          exact
          activeClassName="border-b-2 border-pink-600"
          className="block w-6/12"
          to="/friends"
        >
          <div className="p-2 px-4  text-center cursor-pointer   ">Friends</div>
        </NavLink>
        <NavLink
          exact
          className="block w-6/12"
          to="/friends/request"
          activeClassName="border-b-2 border-pink-600"
        >
          <div className="p-2 px-4  text-center cursor-pointer   ">Request</div>
        </NavLink>
      </div>
      <Switch>
        <Route exact path="/friends" component={FriendList} />
        <Route exact path="/friends/request" component={FriendRequest} />
      </Switch>
    </Wrapper>
  );
}

export default Friends;
