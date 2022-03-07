import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Wrapper from '@layout/Wrapper';
import { useAuth } from '@context/authContext';
import moment from 'moment';

import { RiSendPlaneFill } from 'react-icons/ri';

import { BsSearch } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { feed } from '@services';
import { catchError } from '@utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CommentCard({ comment, suspense }) {
  return (
    <div
      className={`grid grid-cols-[35px,1fr] gap-2  ${
        suspense ? 'opacity-20' : ''
      }`}
    >
      <img
        src={comment.userId.profile}
        className="w-full aspect-square rounded-full object-cover"
      />
      <div>
        <h4 className="text-xs font-medium flex justify-between">
          {comment.userId.username}
          <span className="text-xs text-gray-500 text-right block">
            {moment(comment.createdAt).fromNow()}
          </span>
        </h4>
        <p className="text-xs text-gray-600 ">{comment.text}</p>{' '}
      </div>
    </div>
  );
}

function FeedDetails() {
  const user = useAuth();
  const param = useParams();
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState([]);

  const [fetching, setFetching] = useState(false);
  const [postDetails, setPostDetails] = useState(null);

  const handleComment = async () => {
    try {
      await feed.writeComment({
        text: message,
        postId: param.id,
      });
      setMessage('');
    } catch (error) {
      catchError(error);
    } finally {
      setRefreshKey((e) => e + 1);
    }
  };

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setFetching(true);
        const res = await feed.getPost(param.id);
        console.log(res, 'sss');
        setPostDetails(res.data.post);
      } catch (error) {
        catchError(error);
      } finally {
        setFetching(false);
      }
    };

    fetchFeed();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await feed.getComments(param.id);
        if (data.status) {
          setCommentList(data.comments);
        }
      } catch (error) {
        catchError(error);
      }
    };

    fetchComments();
  }, [refreshKey]);

  return (
    <Wrapper>
      <div className="flex flex-col min-h-screen relative ">
        <div className="flex items-center space-x-2 p-2 bg-slate-50 shadow px-4   ">
          <span
            className="h-8 grid place-content-center cursor-pointer text-gray-700"
            onClick={() => {
              history.goBack();
            }}
          >
            <IoIosArrowBack size={22} />
          </span>
        </div>
        <div>
          {fetching ? (
            <p className="text-gray-500 text-center my-28 ">Loading...</p>
          ) : (
            <div className="text-gray-600 ">
              <div className="relative aspect-square w-full  md:h-[540px] mx-auto  overflow-hidden">
                <LazyLoadImage
                  effect="opacity"
                  alt="profile picture"
                  src={postDetails?.poster[0]}
                  className="w-full  h-full z-10 absolute top-0 right-0 left-0 bottom-0  object-cover mx-auto"
                />
              </div>

              <div className="transition-all  p-4 h-[60vh] max-h-[70vh] md:min-h-[70vh] md:h-auto md:max-h-auto flex flex-col ">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2 items-center">
                    <img
                      className="h-10 w-10 object-cover rounded-full"
                      src={user.profile}
                    />
                    <div>
                      <h4 className="text-sm font-medium">{user.username}</h4>
                      <p className="text-xs text-gray-500">
                        Posted {moment(postDetails?.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-2">{postDetails?.caption}</p>
                <h4 className="text-sm font-medium my-4 text-gray-600">
                  Comments
                </h4>
                <div className="flex-1 flex flex-col  relative overflow-scroll scrollbar-hide">
                  <div className="flex-1 space-y-2 my-2 flex-col">
                    {!Boolean(commentList.length) && (
                      <p className="text-sm text-center text-gray-400  ">
                        No comments yet!!
                      </p>
                    )}
                    {commentList.map((curr) => (
                      <CommentCard key={curr._id} comment={curr} />
                    ))}
                  </div>
                  <div className="flex items-start sticky bg-white  bottom-0">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={1}
                      placeholder="Write comment.."
                      className="border-0 w-full bg-slate-50 text-sm rounded p-2 outline-none focus:ring-0"
                    ></textarea>
                    <span
                      onClick={handleComment}
                      className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0  cursor-pointer"
                    >
                      <RiSendPlaneFill size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default FeedDetails;
