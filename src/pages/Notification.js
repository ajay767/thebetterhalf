import React from "react";
import Wrapper from "@layout/Wrapper";
import Header from "@front/Header";
import user2 from "@assets/images/p2.jpg";
import user4 from "@assets/images/p4.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import Tippy from "@tippyjs/react";

function NotificationCard({ poster, title, description }) {
  return (
    <div className="flex space-x-2 items-start mb-2">
      {poster}
      <div className="text-sm overflow-hidden  ">
        <p className="line-clamp-2  ">{description}</p>
      </div>
      <Tippy
        interactive
        arrow={false}
        trigger="mouseenter"
        delay={0}
        theme="light"
        className="!bg-transparent"
        offset={0}
        content={
          <div className="bg-[#2a2a2a] shadow-md  p-0 rounded overflow-hidden">
            <p className="text-sm md:text-xs cursor-pointer p-2 px-4">Delete</p>
          </div>
        }
      >
        <span className="flex-shrink-0 p-2 aspect-square pr-0 cursor-pointer  ml-auto flex items-center justify-center">
          <BsThreeDotsVertical size={22} />
        </span>
      </Tippy>
    </div>
  );
}

function Notification() {
  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <div>
        <p className="text-base font-medium mb-4">Notifications</p>
        <div>
          <NotificationCard
            poster={
              <img
                src={user2}
                alt="admin"
                className="aspect-square w-10  rounded-md  object-cover flex-shrink-0"
              />
            }
            title="Kuldeep accepted your chat request."
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          dolorem laudantium voluptatibus"
          />
          <NotificationCard
            poster={
              <img
                src={user4}
                alt="admin"
                className="aspect-square w-10  rounded-md  object-cover flex-shrink-0"
              />
            }
            title="Ashutosh accepted your chat request."
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          dolorem laudantium voluptatibus"
          />
          <NotificationCard
            poster={
              <div className="h-10 w-10 flex-shrink-0  bg-white rounded-md shadow-md flex items-center justify-center">
                <p className="logo__text text-[18px] line-through-[12px]">
                  B<span className="text-pink-600">h</span>
                </p>
              </div>
            }
            title="Welcome to Better half family."
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          dolorem laudantium voluptatibus"
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default Notification;
