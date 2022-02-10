import React from "react";
import { Link } from "react-router-dom";
import Header from "@front/Header";
import Wrapper from "@layout/Wrapper";
import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p2.jpg";
import user3 from "@assets/images/p3.jpg";
import user4 from "@assets/images/p4.jpg";
import user5 from "@assets/images/p5.jpg";
function Profilecard({ profile, name, activeStatus }) {
  return (
    <div className="rounded ring-1 ring-gray-400 p-2 text-gray-800 w-28 flex flex-col gap-2 flex-shrink-0  ">
      <img
        alt="anjali"
        src={profile}
        className="h-14 w-14 rounded-full object-cover mx-auto"
      />
      <div>
        <p className="text-sm text-center font-medium mb-1">Anjali singh</p>
        <p className="text-xs text-center text-gray-800">Student</p>
      </div>
      <button className="bg-pink-600 text-white text-xs p-2 px-4  mx-auto block rounded-full ">
        Follow
      </button>
    </div>
  );
}

function profile() {
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
        <p className="text-sm font-medium text-pink-600 text-center">
          4.7K views
        </p>
        <div className="flex gap-2 w-max mx-auto my-2">
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Adventure
          </span>
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Riding
          </span>
        </div>
      </div>
      <div className="scrollbar-hide  flex gap-4 overflow-scroll py-4 px-2">
        <Profilecard profile={user1} />
        <Profilecard profile={user4} />
        <Profilecard profile={user5} />
        <Profilecard profile={user3} />
        <Profilecard profile={user4} />
        <Profilecard profile={user2} />
        <Profilecard profile={user3} />
      </div>
    </Wrapper>
  );
}

export default profile;
