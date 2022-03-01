import React, { useEffect, useState } from "react";
import { useAuth } from "@context/authContext";
import { Link, useHistory, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdInsertPhoto } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import socketio from "socket.io-client";
import Tippy from "@tippyjs/react";
import Wrapper from "@layout/Wrapper";
import { friend } from "@services";
import SocketIOFileUpload from "socketio-file-upload";
import { catchError } from "@utils";
import { IoIosArrowBack } from "react-icons/io";
import user1 from "@assets/images/p1.jpg";
import moment from "moment";

let socket = null;

function Message({ data, type }) {
  console.log(data);
  switch (type) {
    case "SENT": {
      return (
        <div className="p-2 bg-pink-600 mt-2 text-sm rounded-l-lg   min-w-[90px]  rounded-tr-lg     rounded-sm max-w-[75%] w-max  ml-auto text-white ">
          {data.message}
          <span className="text-[12px]  block text-left text-gray-200">
            {moment(data.createdAt).calendar()}
          </span>
        </div>
      );
    }
    case "RECEIVED": {
      return (
        <div className="flex items-end mt-2 space-x-2">
          <img
            src={data.profile}
            alt={data.name}
            className="h-8 w-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="p-2 bg-slate-200 text-gray-600 text-sm  rounded-r-lg  rounded-tl-lg   rounded-sm max-w-[70%] w-max ">
            {data.message}
            <span className="text-[12px]  block text-right text-gray-400">
              {moment(data.createdAt).calendar()}
            </span>
          </div>
        </div>
      );
    }

    default: {
      return <></>;
    }
  }
}

function Conversation() {
  const me = useAuth();
  const history = useHistory();
  const param = useParams();
  const [messages, setMessages] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [user, setUser] = useState({});

  const [message, setMessage] = useState("");

  const handleMessage = () => {
    if (socket) {
      setMessages((e) => {
        console.log(e);
        return [
          ...e,
          {
            type: "SENT",
            photo: me.profile,
            createdAt: new Date(),
            message: message,
            name: me.username,
          },
        ];
      });
      socket.emit("message", message, user._id);
      setMessage("");
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        setFetching(true);
        const res = await friend.getFriendProfile(param.id);
        if (res.data.status) {
          setUser(res.data.data);
        }
      } catch (error) {
        catchError(error);
      } finally {
        setFetching(false);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const Endpoint = process.env.REACT_APP_SERVER;
    console.log("initiating connection" + " at " + Endpoint);

    if (me._id) {
      socket = socketio(Endpoint, {
        autoConnect: false,
        withCredentials: true,
      });

      let uploader = new SocketIOFileUpload(socket);
      // uploader.listenOnInput(document.getElementById("chat_media"));

      // uploader.addEventListener("progress", (e) =>
      //   setPercentage(Math.floor((e.bytesLoaded / e.file.size) * 100))
      // );

      socket.auth = { userId: me._id };
      socket.connect();

      socket.on("message", (msg) => {
        setMessages((e) => [
          ...e,
          {
            type: "RECEIVED",
            photo: user.profile,
            createdAt: new Date(),
            message: msg,
            name: user.username,
          },
        ]);
      });

      socket.on("users", (list) => {
        console.log(list);
      });

      socket.on("media", (data) => {
        console.log(data);
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });

      socket.on("connect_error", (err) => {
        console.log(err.message);
      });
    }
  }, [me]);
  return (
    <Wrapper>
      {fetching ? (
        <p className="text-sm text-gray-500 text-center my-16">Loading...</p>
      ) : (
        <div className="flex flex-col min-h-screen relative ">
          <div className="flex items-center space-x-2 p-4 bg-white py-2 justify-between flex-shrink-0 sticky top-0">
            <div className="flex items-center space-x-2 ">
              <span
                className="h-10 grid place-content-center cursor-pointer text-gray-700"
                onClick={() => {
                  history.goBack();
                }}
              >
                <IoIosArrowBack size={22} />
              </span>
              <img
                src={user?.profile}
                alt={user?.username}
                className="h-10 w-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="text-xs">
                <p className="font-medium  ">{user?.username}</p>
                <p className="flex items-center space-x-2">
                  Active Now
                  <span className="h-2 w-2 ml-2 bg-green-600 rounded-full block"></span>
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
                    Home
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

          <div className="border-t-[1px] border-gray-200 p-3 flex-grow overflow-y-scroll  scrollbar-hide flex flex-col text-sm md:text-xs  ">
            <span className="text-xs mt-2 text-white bg-gray-500 shadow mx-auto block w-max p-1 px-2 rounded">
              Today
            </span>
            {messages.map((curr, ind) => {
              return (
                <Message
                  key={ind}
                  type={curr.type}
                  data={{
                    message: curr.message,
                    createdAt: curr.createdAt,
                    profile: curr.photo,
                  }}
                />
              );
            })}
          </div>
          <div className="bg-slate-400 p-2 flex-shrink-0 flex items-end space-x-2 sticky bottom-0  ">
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
              rows={1}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Message"
              className="w-full min-h-[36px] max-h-[120px] text-sm  ring-0 border-0 focus:ring-0 bg-white  rounded"
            ></textarea>
            <span
              onClick={handleMessage}
              className="h-9 w-9 flex-shrink-0 rounded-full bg-transparent   cursor-pointer  flex items-center justify-center"
            >
              <RiSendPlaneFill size={22} className="text-white" />
            </span>
          </div>
        </div>
      )}{" "}
    </Wrapper>
  );
}

export default Conversation;
