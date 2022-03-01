import React, { useEffect, useState } from "react";
import Header from "@front/Header";
import Wrapper from "@layout/Wrapper";
import { IoImageSharp } from "react-icons/io5";

import { feed } from "@services";
import PostDetails from "@components/PostDetails";

import { useAuth } from "@context/authContext";

function PostFeed({ post }) {
  const [postModal, setPostModal] = useState(false);
  const toggle = () => {
    setPostModal((e) => !e);
  };
  return (
    <>
      {postModal && <PostDetails post={post} onClose={toggle} />}
      <div
        onClick={toggle}
        className="w-full aspect-square  rounded-md overflow-hidden cursor-pointer"
      >
        <img
          src={post?.poster[0]}
          alt={post.caption}
          className="h-full w-full object-cover"
        />
      </div>
    </>
  );
}

function Profile() {
  const user = useAuth();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await feed.getMyPost();
      console.log(res.data);
      if (res.data.status) {
        setFeeds(res.data.posts);
      }
    };

    fetchPosts();
  }, []);
  return (
    <Wrapper className="p-4">
      <Header />

      <div>
        <div className="h-28  w-28  rounded-full p-1 ring-2 ring-pink-600 mx-auto my-4">
          <img
            src={user.profile}
            alt="user"
            className=" h-full w-full rounded-full object-cover "
          />
        </div>
        <p className="text-lg font-medium text-center">
          {user.firstName + " " + user.lastName}
        </p>
        <p className="text-sm font-medium  text-center">{user.status}</p>
        <div className="flex space-x-2 w-max mx-auto my-2">
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Adventure
          </span>
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Riding
          </span>
        </div>
      </div>
      {!Boolean(feeds.length) && (
        <>
          <IoImageSharp size={56} className="mt-8 mx-auto" />
          <p className="text-sm text-center">No Post Yet</p>
        </>
      )}
      <div className="my-4 grid grid-cols-3 gap-2 ">
        {feeds.map((curr) => (
          <PostFeed key={curr._id} post={curr} />
        ))}
      </div>
    </Wrapper>
  );
}

export default Profile;
