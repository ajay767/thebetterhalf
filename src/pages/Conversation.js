import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@context/authContext";
import { Link, useHistory, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { MdInsertPhoto } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import socketio from "socket.io-client";
import Tippy from "@tippyjs/react";
import Wrapper from "@layout/Wrapper";
import { friend } from "@services";
import { BsPlus } from "react-icons/bs";
import { chat } from "@services";
import SocketIOFileUpload from "socketio-file-upload";
import { catchError, getImageFromFile } from "@utils";
import { IoIosArrowBack } from "react-icons/io";
import user1 from "@assets/images/p6.jpg";
import Modal from "@components/Modal";
import moment from "moment";
import { uploadImageFile } from "@utils";
import { useClickoutside } from "@hooks";
import { Line } from "rc-progress";
let socket = null;

function Message({ data, type }) {
  const [enlargeMedia, setEnlargeMedia] = useState(false);

  switch (type) {
    case "SENT": {
      return (
        <div className="p-2 bg-pink-600 mt-2 text-sm rounded-l-lg   min-w-[90px]  rounded-tr-lg     rounded-sm max-w-[75%] w-max  ml-auto text-white ">
          {data.media && (
            <>
              <img
                onClick={() => setEnlargeMedia(true)}
                src={data.media}
                alt={data.media}
                className="w-[220px] rounded mb-2"
              />
              {enlargeMedia && (
                <Modal>
                  <div className="mx-4 w-full md:w-6/12 rounded bg-white relative">
                    <span
                      onClick={() => setEnlargeMedia(false)}
                      className="h-10 w-10 transform rotate-45 absolute right-4 top-4 rounded-full bg-gray-100 cursor-pointer   flex items-center justify-center"
                    >
                      <BsPlus size={32} className="text-gray-600" />
                    </span>
                    <a
                      href={data.media}
                      download
                      className="h-10 w-10 absolute right-16 top-4 rounded-full bg-gray-100 cursor-pointer   flex items-center justify-center"
                    >
                      <HiDownload size={24} className="text-gray-600" />
                    </a>

                    <img
                      src={data.media}
                      alt={data.media}
                      className="w-full h-full object-cover rounded max-h-[420px]"
                    />
                  </div>
                </Modal>
              )}
            </>
          )}
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
            src={data.photo}
            alt={data.name}
            className="h-8 w-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="p-2 bg-slate-200 text-gray-600 text-sm  rounded-r-lg  rounded-tl-lg   rounded-sm max-w-[70%] w-max ">
            {data.media && (
              <>
                <img
                  onClick={() => setEnlargeMedia(true)}
                  src={data.media}
                  alt={data.media}
                  className="w-[220px] rounded mb-2"
                />
                {enlargeMedia && (
                  <Modal>
                    <div className="mx-4 w-full md:w-6/12 rounded bg-white relative">
                      <span
                        onClick={() => setEnlargeMedia(false)}
                        className="h-10 w-10 transform rotate-45 absolute right-4 top-4 rounded-full bg-gray-100 cursor-pointer   flex items-center justify-center"
                      >
                        <BsPlus size={32} className="text-gray-600" />
                      </span>
                      <a
                        href={data.media}
                        download
                        className="h-10 w-10 absolute right-16 top-4 rounded-full bg-gray-100 cursor-pointer   flex items-center justify-center"
                      >
                        <HiDownload size={24} className="text-gray-600" />
                      </a>

                      <img
                        src={data.media}
                        alt={data.media}
                        className="w-full h-full object-cover rounded max-h-[420px]"
                      />
                    </div>
                  </Modal>
                )}
              </>
            )}

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

const FileExplorer = React.forwardRef(
  ({ handleMedia, emitEndEvent, emitStartEvent }, ref) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    async function handleFile(file) {
      try {
        setFile(file);
        setUploading(true);
        const res = await uploadImageFile(file, setProgress);
        setFile(res);
      } catch (error) {
        catchError(error);
      } finally {
        setUploading(false);
      }
    }

    useEffect(() => {
      emitStartEvent();
      return function () {
        emitEndEvent();
      };
    }, []);

    return (
      <div
        ref={ref}
        className="p-4 rounded bg-white mx-4 w-full md:w-8/12 lg:w-4/12 lg:mx-auto"
      >
        <div
          className={`border border-gray-400     border-dashed  p-4 rounded h-[320px] ${
            !file ? " grid place-content-center " : ""
          }`}
        >
          {file ? (
            <img
              src={getImageFromFile(file) || user1}
              alt="3dd"
              className="w-full h-full object-cover rounded-md "
            />
          ) : (
            <p className="text-gray-500 text-base text-center m-auto h-full ">
              No file choosen
            </p>
          )}
        </div>
        <input
          onChange={(e) => handleFile(e.target.files[0])}
          type="file"
          className="hidden"
          id="file_share"
        />
        <div className="flex items-center">
          <label
            htmlFor="file_share"
            className="text-sm text-slate-300 bg-gray-600 p-2 px-4 mr-4 rounded my-4 block w-max cursor-pointer"
          >
            Choose File
          </label>
          <p className="text-sm text-gray-500 ">{file?.name}</p>
        </div>
        {uploading && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              {" "}
              Uploading file {progress}%
            </p>
            <Line percent={progress} strokeWidth="1" strokeColor="#2a2a2a" />
          </div>
        )}
        <div className="flex">
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            className="text-sm pl-0 flex-grow ring-0 border-0 focus:ring-0"
          ></textarea>
          <button
            onClick={() => {
              handleMedia({ message, media: file });
            }}
            disabled={uploading}
            className="text-sm p-2 px-4 flex-shrink-0 text-gray-600  rounded-full h-10 w-10 grid place-content-center"
          >
            <RiSendPlaneFill size={24} />
          </button>
        </div>
      </div>
    );
  }
);

function Conversation() {
  const me = useAuth();
  const fileExplorerRef = useRef();
  const chatRef = useRef();
  const history = useHistory();
  const param = useParams();
  const [mediaModal, setMediaModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [mediaAcknowledge, setMediaAcknowledge] = useState(false);
  const [typingAcknowledge, setTypingAcknowledge] = useState(false);
  const [user, setUser] = useState({});

  const [message, setMessage] = useState("");
  useClickoutside(fileExplorerRef, () => setMediaModal(false));

  const handleMessage = () => {
    if (socket && message) {
      setMessages((e) => {
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
      socket.emit("message", { message, media: null }, user._id);

      setMessage("");
    }
  };

  const handleMediaMessage = ({ message, media }) => {
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
            media,
            name: me.username,
          },
        ];
      });
      socket.emit("message", { message, media }, user._id);
      setMessage("");
    }

    setMediaModal(false);
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
    async function fetchChat() {
      try {
        setFetching(true);
        const res = await chat.getChats(param.id);
        if (res.data.status) {
          const messages = res.data.chats.map((curr) => {
            if (curr.sender._id === me._id) {
              return {
                type: "SENT",
                photo: me.profile,
                createdAt: curr.createdAt,
                message: curr.message,
                media: curr.media,
                name: me.username,
              };
            } else {
              return {
                type: "RECEIVED",
                photo: user.profile,
                createdAt: curr.createdAt,
                message: curr.message,
                media: curr.media,
                name: me.username,
              };
            }
          });

          setMessages(messages);
        }
      } catch (error) {
        catchError(error);
      } finally {
        setFetching(false);
      }
    }

    if (user) fetchChat();
  }, [user]);

  useEffect(() => {
    const Endpoint = process.env.REACT_APP_SERVER;

    if (me._id) {
      console.log(me);
      socket = socketio(Endpoint, {
        autoConnect: false,
        withCredentials: true,
      });

      socket.auth = { userId: me._id };
      socket.connect();

      socket.on("message", ({ message, media }) => {
        setMessages((e) => [
          ...e,
          {
            type: "RECEIVED",
            photo: user.profile,
            createdAt: new Date(),
            message: message,
            media: media,
            name: user.username,
          },
        ]);
      });

      socket.on("media-sharing-start", () => {
        setMediaAcknowledge(true);
      });

      socket.on("media-sharing-end", () => {
        setMediaAcknowledge(false);
      });

      socket.on("typing-start", () => {
        setTypingAcknowledge(true);
      });

      socket.on("typing-end", () => {
        setTypingAcknowledge(false);
      });

      socket.on("users", (list) => {
        // console.log(list);
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

    return function () {
      if (socket) {
        socket.off();
        socket.disconnect();
      }
    };
  }, [me]);

  useEffect(() => {
    let timeout;
    const handleKeyDown = (e) => {
      if (socket && e.keyCode !== 13) {
        socket.emit("typing-start", user._id);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          socket.emit("typing-end", user._id);
        }, 2000);
      }
      if (e.keyCode === 13) {
        handleMessage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return function () {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user]);

  useEffect(() => {
    if (chatRef?.current?.lastElementChild) {
      const lastElement = 0;
      const visibleHeight = chatRef.current.offsetHeight;
      const containerHeight = chatRef.current.scrollHeight;
      const scrollOffset = chatRef.current.scrollTop + visibleHeight;
      // if (containerHeight - lastElement <= scrollOffset) {
      //   chatRef.current.scrollTop = chatRef.current.scrollHeight;
      // }
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  });

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
                <p className="flex items-center space-x-2 text-gray-500">
                  {mediaAcknowledge ? (
                    <i>sharing media...</i>
                  ) : typingAcknowledge ? (
                    <i>typing...</i>
                  ) : (
                    <>
                      Active
                      <span className="h-2 w-2 ml-2 bg-green-600 rounded-full block"></span>
                    </>
                  )}
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

          <div
            ref={chatRef}
            className="border-t-[1px] border-gray-200 p-3 flex-grow overflow-y-scroll  scrollbar-hide flex flex-col text-sm md:text-xs  "
          >
            <span className="text-xs mt-2 text-white bg-gray-500 shadow mx-auto block w-max p-1 px-2 rounded">
              Today
            </span>
            {messages.map((curr, ind) => {
              return <Message key={ind} type={curr.type} data={curr} />;
            })}
          </div>
          {mediaModal && (
            <Modal>
              <FileExplorer
                emitStartEvent={() => {
                  socket.emit("media-sharing-start", user._id);
                }}
                emitEndEvent={() => {
                  socket.emit("media-sharing-end", user._id);
                }}
                handleMedia={handleMediaMessage}
                ref={fileExplorerRef}
              />
            </Modal>
          )}
          <div className="bg-slate-400 p-2 flex-shrink-0 flex items-end space-x-2 sticky bottom-0  ">
            <label
              onClick={() => setMediaModal(true)}
              className="cursor-pointer  "
            >
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
