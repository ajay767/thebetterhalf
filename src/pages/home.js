import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";
import Wrapper from "@layout/Wrapper";
import Header from "@front/Header";
import { LazyLoadImage } from "react-lazy-load-image-component";
import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p2.jpg";
import user3 from "@assets/images/p3.jpg";
import user4 from "@assets/images/p4.jpg";
import user5 from "@assets/images/p5.jpg";
import { Button } from "@ui";
import profile1 from "@assets/images/user1.jpeg";
import profile2 from "@assets/images/user2.jpeg";

import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useAuth } from "@context/authContext";

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
          } cursor-pointer flex items-center space-x-2`}
        >
          <AiOutlineLike size={18} />
          35 Like
        </span>
        <span className=" flex-grow justify-center  text-xs font-medium p-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
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

function FeedPost({ image }) {
  const [reacted, setreacted] = useState(false);

  return (
    <div className="my-4">
      <div className="py-2 flex items-center justify-between">
        <span className="flex items-center">
          <img
            src={image}
            alt="Some other user"
            className="h-10 w-10 object-cover rounded-full mr-2"
          />
          <div>
            <p className="text-xs font-semibold ">Anup Singh</p>
          </div>
        </span>
        <BsThreeDotsVertical size={22} className="cursor-pointer" />
      </div>
      <div className="min-h-[230px]   p-2 text-sm">
        <p>
          Hello ,<b>this is my</b> first post on better Half.Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum
        </p>
        <img src={user1} className="rounded my-2 " />
      </div>
      <div className="flex justify-around bg-white">
        <span
          onClick={() => setreacted((e) => !e)}
          className={` flex-grow justify-center hover:bg-gray-100 text-xs font-medium p-2 px-4 ${
            reacted ? "text-pink-500" : " "
          } cursor-pointer flex items-center space-x-2`}
        >
          <AiOutlineLike size={18} />
          35 Like
        </span>
        <span className=" flex-grow justify-center  text-xs font-medium p-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
          <FaRegComment size={18} />
          10 Comment
        </span>
      </div>
    </div>
  );
}

function Home() {
  const tiny = useRef();
  const user = useAuth();
  console.log(user, "home");

  function getPostContent() {
    console.log(tiny.current.getContent());
  }

  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <div className="w-full">
        <div className="flex items-center mb-2">
          <img
            src={user.profile}
            alt={user.username}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <h4 className="text-slate-600 font-medium text-sm ">
              Good morning, {user.username}
            </h4>
            <p className="text-slate-500 text-xs ">What's on your mind</p>
          </div>
        </div>
        <Editor
          onInit={(evt, editor) => (tiny.current = editor)}
          apiKey="8u6tk8h1itzc2rqq6hsko64rgabuvavkkya3zstce9i7snuy"
          init={{
            height: 300,
            toolbar: false,
            menubar: false,
            inline: true,
            selector: ".gg",
            // quickbars_insert_toolbar: "quicktable image media codesample",
            quickbars_selection_toolbar:
              "undo redo  formatselect  " + "bold italic",
            block_formats: "Paragraph=p;  Heading=h4",
            plugins: [
              "advlist quickbars autolink lists link image charmap print  anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar: "undo redo  formatselect  " + "bold italic",
            body_class: "sdss",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px,min-height:240px }",
          }}
        />
        <Button onClick={getPostContent}>Save</Button>
      </div>
      <FeedPost image={user3} />
      <FeedCard liked image={user2} />
      <FeedCard image={user4} />
      <FeedCard image={user3} />
      <FeedCard image={user2} />
      <FeedCard image={user1} />
    </Wrapper>
  );
}

export default Home;
