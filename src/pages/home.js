import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Wrapper from "@layout/Wrapper";
import Header from "@front/Header";
import { LazyLoadImage } from "react-lazy-load-image-component";
import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p2.jpg";
import user3 from "@assets/images/p3.jpg";
import user4 from "@assets/images/p4.jpg";
import user5 from "@assets/images/p5.jpg";

import profile1 from "@assets/images/user1.jpeg";
import profile2 from "@assets/images/user2.jpeg";

import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

function FeedCard({ image, liked }) {
  const [reacted, setreacted] = useState(liked);
  return (
    <div className="my-4">
      <div className="py-2 flex items-center justify-between">
        <span className="flex items-center">
          <img
            src={profile2}
            alt="Some other user"
            className="h-10 w-10 object-cover rounded-full mr-2"
          />
          <div>
            <p className="text-xs font-semibold ">Anup Singh</p>
          </div>
        </span>
        <BsThreeDotsVertical size={22} className="cursor-pointer" />
      </div>
      <div className="bg-slate-100">
        <div className="relative aspect-square w-full md:w-auto md:h-[540px] mx-auto  overflow-hidden">
          <LazyLoadImage
            effect="opacity"
            alt="profile picture"
            src={image}
            className="w-full  h-full z-10 absolute top-0 right-0 left-0 bottom-0  object-cover mx-auto"
          />
        </div>
      </div>
      <div className="flex justify-around bg-white">
        <span
          onClick={() => setreacted((e) => !e)}
          className={` flex-grow justify-center  text-xs font-medium p-2 px-4 ${
            reacted ? "text-pink-500" : "hover:bg-gray-100 "
          } cursor-pointer flex items-center gap-2`}
        >
          <AiOutlineLike size={18} />
          35 Like
        </span>
        <span className=" flex-grow justify-center  text-xs font-medium p-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
          <FaRegComment size={18} />
          10 Comment
        </span>
      </div>

      <div className="py-2">
        <span className="flex items-center">
          <img
            src={profile1}
            alt="Some other user"
            className="h-8 w-8 object-cover rounded-full mr-2"
          />
          <div>
            <p className="text-xs font-semibold ">Anup Singh</p>
            <p className="text-xs">
              Hey jasmine!!, you are looking wonderfull😍
            </p>
          </div>
        </span>
        <p className="text-gray-700 cursor-pointer ml-10 mt-2 text-xs ">
          View all comments
        </p>
      </div>
      <div className="my-2 flex items-start">
        <img
          src={profile2}
          alt="Some other user"
          className="h-8 w-8 object-cover rounded-full mr-2"
        />
        <textarea
          rows={1}
          placeholder="Write comment.."
          className="border-0 w-full text-xs rounded p-2 outline-none focus:ring-0"
        ></textarea>
        <span className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-100 cursor-pointer">
          <RiSendPlaneFill size={18} />
        </span>
      </div>
    </div>
  );
}

function Home() {
  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <FeedCard liked image={user5} />
      <FeedCard image={user4} />
      <FeedCard image={user3} />
      <FeedCard image={user2} />
      <FeedCard image={user1} />
    </Wrapper>
  );
}

export default Home;
