import React, { useState, useEffect } from 'react';
import Modal from '@components/Modal';
import moment from 'moment';
import { useAuth } from '@context/authContext';
import {
  BsPlus,
  BsHeart as Unliked,
  BsFillHeartFill as Liked,
} from 'react-icons/bs';
import { RiSendPlaneFill } from 'react-icons/ri';
import { feed } from '@services';
import { catchError } from '@utils';

function CommentCard({ comment, suspense }) {
  return (
    <div
      className={`grid grid-cols-[35px,1fr] gap-2  ${
        suspense ? 'opacity-20' : ''
      }`}
    >
      <img
        src={comment.userId.profile}
        className='w-full aspect-square rounded-full object-cover'
      />
      <div>
        <h4 className='text-xs font-medium flex justify-between'>
          {comment.userId.username}
          <span className='text-xs text-gray-500 text-right block'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </h4>
        <p className='text-xs text-gray-600 '>{comment.text}</p>{' '}
      </div>
    </div>
  );
}

function PostDetails({ post, onClose }) {
  const user = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const [like, setLike] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  const handleComment = async () => {
    try {
      await feed.writeComment({
        text: message,
        postId: post._id,
      });
      setMessage('');
    } catch (error) {
      catchError(error);
    } finally {
      setRefreshKey((e) => e + 1);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await feed.getComments(post._id);
        if (data.status) {
          setList(data.comments);
        }
      } catch (error) {
        catchError(error);
      }
    };

    fetchComments();
  }, [refreshKey]);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await feed.getLikes(post._id);
        if (data.status) {
          data.post.likes.map(({ userId }) => {
            console.log(userId, user._id);
            if (userId == user._id) {
              setLike(true);
            }
          });
          setTotalLikes(data.post.likes.length);
        }
      } catch (err) {
        catchError(err);
      }
    };
    fetchLikes();
  }, []);
  const handleLike = () => {
    const data = {
      postId: post._id,
    };
    if (!like) {
      setTotalLikes(totalLikes + 1);
      setLike(true);
      feed.createLike(data);
    } else {
      setTotalLikes(totalLikes - 1);
      setLike(false);
      feed.deleteLike(data);
    }
  };
  return (
    <Modal>
      <div className='bg-white w-11/12 md:w-8/12 mx-auto flex flex-col md:flex-row  '>
        <div className='relative md:w-5/12 h-[40vh]  md:h-[70vh]'>
          <span
            onClick={handleLike}
            className='h-10 w-10 absolute left-4 top-4 rounded-full bg-gray-100 cursor-pointer   flex items-center justify-center'
          >
            {like && <Liked size={32} className='text-pink-600' />}
            {!like && <Unliked size={32} className='text-pink-600' />}
          </span>
          <img src={post.poster[0]} className='h-full w-full object-cover' />
        </div>
        <div className='transition-all md:w-7/12 p-4 h-[40vh] max-h-[50vh] md:min-h-[70vh] md:h-auto md:max-h-auto flex flex-col '>
          <div className='flex items-center justify-between'>
            <div className='flex space-x-2 items-center'>
              <img
                className='h-10 w-10 object-cover rounded-full'
                src={user.profile}
              />
              <div>
                <h4 className='text-sm font-medium'>{user.username}</h4>
                <p className='text-xs text-gray-500'>
                  Posted {moment(post.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <span
              onClick={onClose}
              className='h-10 w-10 transform rotate-45 rounded-full bg-gray-100 cursor-pointer   flex items-center justify-center'
            >
              <BsPlus size={32} className='text-gray-600' />
            </span>
          </div>
          <p className='text-sm mt-2'>{post.caption}</p>
          <h4 className='text-sm font-medium my-4 text-gray-600'>Comments</h4>
          <div className='flex-1 flex flex-col  relative overflow-scroll scrollbar-hide'>
            <div className='flex-1 space-y-2 my-2 flex-col'>
              {!Boolean(list.length) && (
                <p className='text-sm text-center text-gray-400  '>
                  No comments yet!!
                </p>
              )}
              {list.map((curr) => (
                <CommentCard key={curr._id} comment={curr} />
              ))}
            </div>
            <div className='flex items-start sticky bg-white  bottom-0'>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={1}
                placeholder='Write comment..'
                className='border-0 w-full bg-slate-50 text-sm rounded p-2 outline-none focus:ring-0'
              ></textarea>
              <span
                onClick={handleComment}
                className='h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0  cursor-pointer'
              >
                <RiSendPlaneFill size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostDetails;
