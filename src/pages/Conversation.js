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
function Conversation() {
  return (
    <Wrapper>
      {/* <Header /> */}
      <div className="flex flex-col min-h-[95vh] relative">
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
        <div className="p-2 flex-grow overflow-y-scroll  scrollbar-hide flex flex-col text-sm md:text-xs gap-2 ">
          <span className="text-xs text-white bg-gray-500 shadow mx-auto block w-max p-1 px-2 rounded">
            Today
          </span>
          <div className="p-2 bg-slate-200 rounded-sm max-w-[75%] w-max ">
            Hello
          </div>
          <div className="p-2 bg-pink-600 rounded-l-lg     rounded-tr-lg     rounded-sm max-w-[75%] w-max  ml-auto text-white ">
            Heyy!!
          </div>
          <div className="p-2 bg-pink-600 rounded-l-lg     rounded-tr-lg      rounded-sm max-w-[75%] w-max  ml-auto text-white ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            molestiae necessitatibus vero tenetur ullam praesentium. Maxime
            aperiam laudantium consectetur, molestias numquam doloremque odit
            distinctio officiis sapiente cumque quidem aut fugit!
          </div>
          <div className="  rounded-lg overflow-hidden max-w-[75%] w-max  ml-auto text-white ">
            <img src={user3} alt="share" className="rounded h-52" />
          </div>
          <div className="p-2 bg-slate-200 rounded-sm max-w-[75%] w-max ">
            H tenetur ullam praesentium. Maxime aperiam laudantium consectetur,
            molestias numquam doloremque odit distinctio officiis sapiente
            cumque quidem
          </div>
          <div className=" bg-slate-200 rounded-sm max-w-[75%] w-max ">
            <img src={user2} alt="share" className="rounded h-52" />
          </div>
          <div className="p-2 bg-pink-600 rounded-l-lg     rounded-tr-lg     rounded-sm max-w-[75%] w-max  ml-auto text-white ">
            Lorem ipsum dolor sit amet consectetur pariatur dicta asperiores.
          </div>
          <div className="p-2 bg-pink-600 rounded-l-lg     rounded-tr-lg     rounded-sm max-w-[75%] w-max  ml-auto text-white ">
            Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Nesciunt iure commodi quam dolore odio, quis optio
            fugiat magnam nam laborum necessitatibus adipisci tenetur minus
            voluptas repellat iusto aliquid? Dolorum, debitis! amet consectetur
            pariatur dicta asperiores.
          </div>
          <div className="  rounded-sm max-w-[75%] w-max  ml-auto text-white ">
            <img src={user3} alt="share" className="rounded h-52" />
          </div>
          <div className="p-2 bg-slate-200 rounded-sm max-w-[75%] w-max ">
            H tenetur ullam praesentium. Maxime aperiam laudantium consectetur,
            molestias numquam doloremque odit distinctio officiis sapiente
            cumque quidem
          </div>
        </div>
        <div className="p-2 flex-shrink-0 flex items-start gap-2 sticky bottom-0 bg-white ">
          <input
            className="hidden "
            type="file"
            id="chat_media"
            name="chat_media"
          />
          <label htmlFor="chat_media" className="cursor-pointer  ">
            <span className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100  flex items-center justify-center">
              <MdInsertPhoto size={24} className="text-slate-600" />
            </span>
          </label>
          <textarea
            rows={2}
            placeholder="Message"
            className="w-full text-sm md:text-xs ring-0 border-0 focus:ring-0 bg-slate-100 rounded-sm"
          ></textarea>
          <span className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100  flex items-center justify-center">
            <RiSendPlaneFill size={22} className="text-slate-600" />
          </span>
        </div>
      </div>
    </Wrapper>
  );
}

export default Conversation;
