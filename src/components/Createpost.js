import React, { useEffect, useRef, useState } from "react";
import { useTextareaHeightDriver } from "@hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@ui";
import { IoImageSharp } from "react-icons/io5";
import { uploadImageFile } from "@utils";
import { catchError } from "@utils";
import { FEED_POST_DRAFT } from "@constant";
import { feed } from "@services";
import toast from "react-hot-toast";

function Createpost({ user }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [pictures, setPictures] = useState(
    JSON.parse(localStorage.getItem(FEED_POST_DRAFT)) || []
  );
  const textref = useRef();
  const [caption, setCaption] = useState("");
  useTextareaHeightDriver(textref, caption);

  async function addPostImages(file) {
    try {
      setUploading(true);
      if (!file) return;
      if (pictures.length >= 4) {
        return toast.error("You cannot add more than 4 post at a time");
      }
      const url = await uploadImageFile(file, setProgress);
      setPictures((curr) => {
        const newList = [...curr, { url, name: file.name }];
        localStorage.setItem(FEED_POST_DRAFT, JSON.stringify(newList));
        return newList;
      });
    } catch (error) {
      catchError(error);
    } finally {
      setUploading(false);
    }
  }

  function removePostImage(url) {
    const filterd = pictures.filter((e) => e.url !== url);
    localStorage.setItem(FEED_POST_DRAFT, JSON.stringify(filterd));
    setPictures(filterd);
  }

  async function createPost() {
    try {
      setPosting(true);
      const res = await feed.createPost({
        caption,
        poster: pictures.map((e) => e.url),
      });
      console.log(res);
      if (res.data.status) {
        toast.success(res.data.message);
        localStorage.removeItem(FEED_POST_DRAFT);
        setPictures([]);
        setCaption("");
      }
    } catch (error) {
      catchError(error);
    } finally {
      setPosting(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-[35px,1fr] gap-2">
        <img
          src={user.profile}
          alt={user.username}
          className="aspect-square  w-full rounded-full mr-2"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-600 text-sm ">
            What's on your mind...
          </p>
          <textarea
            ref={textref}
            value={caption}
            // placeholder="What's on your mind"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            rows={1}
            className="text-sm px-0 rounded-md outline-none focus:ring-0 w-full focus: border-0 focus:border-gray-400 border-gray-400 "
          ></textarea>
        </div>
      </div>
      <div className="flex items-start flex-wrap overflow-hidden ">
        {pictures.map((e, i) => (
          <div
            key={i + Math.random()}
            onClick={() => removePostImage(e.url)}
            className="h-36 w-36 m-2 rounded-md overflow-hidden shadow relative"
          >
            <span className="bg-slate-200 h-8 w-8 rounded-full grid place-content-center absolute right-2 top-2 transform rotate-45 cursor-pointer hover:shadow-md">
              <AiOutlinePlus size={18} />
            </span>
            <img
              src={e.url}
              alt={e.name}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <div>
        <input
          onChange={(e) => {
            addPostImages(e.target.files[0]);
          }}
          type="file"
          id="post_image"
          className="hidden"
        />
        <div className="flex items-center justify-end space-x-2">
          <Button className="block">
            <label
              className="flex space-x-2 items-center w-max cursor-pointer"
              htmlFor="post_image"
            >
              {uploading ? (
                `Uploaded ${progress}%`
              ) : (
                <>
                  {" "}
                  <span> Choose Picture</span> <IoImageSharp size={18} />
                </>
              )}
            </label>
          </Button>
          <Button className="block" onClick={createPost}>
            {posting ? `Please wait...` : "Publish"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Createpost;
