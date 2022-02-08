import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdInsertPhoto } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import Wrapper from "@layout/Wrapper";

import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p4.jpg";
import user3 from "@assets/images/p5.jpg";

function Received({ message }) {
  return (
    <div className="p-2 bg-slate-200 text-gray-500 text-sm  rounded-r-lg  rounded-tl-lg   rounded-sm max-w-[75%] w-max ">
      {message}
      <span className="text-[12px]  block text-right text-gray-600">
        3:20 PM
      </span>
    </div>
  );
}

function Sent({ message }) {
  return (
    <div className="p-2 bg-pink-600 text-sm rounded-l-lg   min-w-[90px]  rounded-tr-lg     rounded-sm max-w-[75%] w-max  ml-auto text-white ">
      {message}
      <span className="text-[12px]  block text-left text-white">3:20 PM</span>
    </div>
  );
}

function Conversation() {
  return (
    <Wrapper>
      <div className="flex flex-col min-h-screen relative ">
        <div className="flex items-center gap-2 p-4 bg-white py-2 justify-between flex-shrink-0 sticky top-0">
          <div className="flex items-center gap-2 ">
            <img
              src={user1}
              alt="Anamika"
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="text-xs">
              <p className="font-medium  ">Anamika Yadav</p>
              <p className="flex items-center gap-2">
                Active Now{" "}
                <span className="h-2 w-2 bg-green-600 rounded-full block"></span>
              </p>
            </div>
          </div>
          <Tippy
            interactive
            arrow={false}
            trigger="mouseenter"
            delay={0}
            theme="light"
            className="!bg-transparent   "
            content={
              <div className="bg-[#2a2a2a] z-[1000] shadow-md w-36 p-0 rounded overflow-hidden">
                <Link
                  to="/home"
                  className="text-sm px-4 p-2 block hover:bg-black text-white"
                >
                  Profile
                </Link>
                <Link
                  to="/chat"
                  className="text-sm px-4 p-2 block hover:bg-black text-white"
                >
                  Message
                </Link>
                <Link
                  to="/home"
                  className="text-sm px-4 p-2 block hover:bg-black text-white"
                >
                  Setting
                </Link>
                <Link
                  to="/home"
                  className="text-sm px-4 p-2 block hover:bg-black text-white"
                >
                  Logout
                </Link>
              </div>
            }
          >
            <span>
              <BsThreeDotsVertical size={24} />
            </span>
          </Tippy>
        </div>
        <div className="border-t-[1px] border-gray-200 p-3 flex-grow overflow-y-scroll  scrollbar-hide flex flex-col text-sm md:text-xs gap-2 ">
          <span className="text-xs text-white bg-gray-500 shadow mx-auto block w-max p-1 px-2 rounded">
            Today
          </span>
          <Sent message={"Hello"} />
          <Received
            message="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            molestiae necessitatibus vero tenetur ullam praesentium. Maxime
            aperiam laudantium consectetur, molestias numquam doloremque odit
            distinctio officiis sapiente cumque quidem aut fugit!"
          />
        </div>
        <div className="bg-slate-400 p-2 flex-shrink-0 flex items-end gap-2 sticky bottom-0  ">
          <input
            className="hidden "
            type="file"
            id="chat_media"
            name="chat_media"
          />
          <label htmlFor="chat_media" className="cursor-pointer  ">
            <span className="h-9 w-9 flex-shrink-0 rounded-full bg-transparent    flex items-center justify-center">
              <MdInsertPhoto size={22} className="text-white" />
            </span>
          </label>
          <textarea
            placeholder="Message"
            className="w-full min-h-[36px] max-h-[120px] text-sm  ring-0 border-0 focus:ring-0 bg-white  rounded-md"
          ></textarea>
          <span className="h-9 w-9 flex-shrink-0 rounded-full bg-transparent   cursor-pointer  flex items-center justify-center">
            <RiSendPlaneFill size={22} className="text-white" />
          </span>
        </div>
      </div>
    </Wrapper>
  );
}

export default Conversation;
