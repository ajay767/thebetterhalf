import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Editor } from '@tinymce/tinymce-react';
import Wrapper from '@layout/Wrapper';
import Header from '@front/Header';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import user1 from '@assets/images/p1.jpg';
import user2 from '@assets/images/p2.jpg';
import user3 from '@assets/images/p3.jpg';
import user4 from '@assets/images/p4.jpg';
import user5 from '@assets/images/p5.jpg';
import Createpost from '@components/Createpost';
import { Button } from '@ui';
import profile1 from '@assets/images/user1.jpeg';
import profile2 from '@assets/images/user2.jpeg';

import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useAuth } from '@context/authContext';
import { feed } from '@services';

import InfiniteScroll from 'react-infinite-scroll-component';

function FeedCard({
  username,
  totalLikes,
  profile,
  image,
  liked,
  comment,
  postId,
  userId,
  ...props
}) {
  const [reacted, setreacted] = useState(liked);
  const [totalLiked, setTotalLiked] = useState(totalLikes);
  const handleLikes = async () => {
    setreacted(!reacted);
    const data = { postId };
    if (reacted) {
      setTotalLiked(totalLiked - 1);
      feed.deleteLike(data);
    } else {
      setTotalLiked(totalLiked + 1);
      feed.createLike(data);
    }
  };
  return (
    <div {...props} className="my-4">
      <div className="py-2 flex items-center justify-between">
        <span className="flex items-center">
          <img
            src={profile}
            alt="Some other user"
            className="h-10 w-10 object-cover rounded-full mr-2"
          />
          <div>
            <p className="text-xs font-semibold ">{username}</p>
          </div>
        </span>
        <BsThreeDotsVertical size={22} className="cursor-pointer" />
      </div>
      <div className="bg-slate-100">
        <Link to={`/feed/${postId}`}>
          <div className="relative w-full md:w-auto h-[540px] mx-auto  overflow-hidden">
            <LazyLoadImage
              effect="opacity"
              alt="profile picture"
              src={image}
              className="w-full  h-full z-10 absolute top-0 right-0 left-0 bottom-0  object-cover mx-auto"
            />
          </div>
        </Link>
      </div>
      <div className="flex justify-around bg-white">
        <span
          onClick={() => handleLikes()}
          className={` flex-grow justify-center  text-xs font-medium p-2 px-4 ${
            reacted ? 'text-pink-500' : 'hover:bg-gray-100 '
          } cursor-pointer flex items-center space-x-2`}
        >
          <AiOutlineLike size={18} />
          {totalLiked} Like
        </span>
        <Link to={`/feed/${postId}`} className=" flex-grow">
          <span className=" justify-center  text-xs font-medium p-2 px-4 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
            <FaRegComment size={18} />
            Comment
          </span>
        </Link>
      </div>

      {comment.text && (
        <div className="py-2">
          <span className="flex items-center">
            <img
              src={comment.profile}
              alt="Some other user"
              className="h-8 w-8 object-cover rounded-full mr-2"
            />
            <div>
              <p className="text-xs font-semibold ">{comment.author}</p>
              <p className="text-xs">{comment.text}</p>
            </div>
          </span>
          <Link to={`/feed/${postId}`}>
            <p className="text-gray-700 cursor-pointer ml-10 mt-2 text-xs ">
              View all comments
            </p>
          </Link>
        </div>
      )}
      {/* <div className="my-2 flex items-start">
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
      </div> */}
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
            reacted ? 'text-pink-500' : ' '
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
  const [page, setPage] = useState(1);
  const [newsFeedPosts, setNewsFeedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  console.log(user, 'home');

  function getPostContent() {
    console.log(tiny.current.getContent());
  }
  useEffect(() => {
    const fetchNewsFeed = async () => {
      const { data } = await feed.newsFeed(page);
      const newData = [...data.data];
      if (newData?.length < 5) {
        setHasMore(false);
      }
      setNewsFeedPosts([...newsFeedPosts, ...newData]);
      console.log(data);
    };
    fetchNewsFeed();
  }, [page]);

  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <div className="w-full">
        <Createpost user={user} />
      </div>
      <InfiniteScroll
        dataLength={newsFeedPosts.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
      >
        {newsFeedPosts.map((post, idx) => {
          const totalLikes = post?.likes.length;
          const liked = post.likes.find(({ userId }) => {
            return userId == user._id;
          });

          return (
            <FeedCard
              postId={post._id}
              userId={user._id}
              totalLikes={totalLikes}
              key={post._id}
              username={post.userId.username}
              profile={post.userId.profile}
              liked={liked}
              image={post?.poster[0]}
              comment={{
                author: post?.comments[0]?.userId?.username,
                text: post?.comments[0]?.text,
                profile: post?.comments[0]?.userId?.profile,
              }}
            />
          );
        })}
      </InfiniteScroll>
    </Wrapper>
  );
}

export default Home;
