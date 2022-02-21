import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import Modal from "@components/Modal";
import Header from "@front/Header";
import Wrapper from "@layout/Wrapper";
import avtar from "@assets/avtar/user.png";
import { friend } from "@services";
import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p2.jpg";
import user3 from "@assets/images/p3.jpg";
import user4 from "@assets/images/p4.jpg";
import user5 from "@assets/images/p5.jpg";

import { BsPlus } from "react-icons/bs";
import { catchError } from "@utils";

function User() {
  const params = useParams();
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    profile: avtar,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await friend.getFriendProfile(params.id);
        if (data.status) {
          setUser(data.data);
        }
      } catch (error) {
        catchError(error);
      }
    };
    fetchProfile();
  }, [params]);
  return (
    <Wrapper className="p-4">
      <Header />

      <div>
        <div className="h-28  w-28  rounded-full  mx-auto my-4 relative">
          <img
            src={user.profile}
            alt="user"
            className=" h-full w-full rounded-full object-cover "
          />
          <Link to={`/chat/${user._id}`}>
            <span className="absolute bottom-0 right-0 bg-white shadow-md hover:bg-pink-600 hover:text-white cursor-pointer flex items-center justify-center   text-pink-600 text-xs p-2  rounded-full ring-1 ring-pink-600">
              <MdMessage size={18} />
            </span>
          </Link>
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
      <div className="my-4 grid grid-cols-3 gap-2 ">
        <img
          src={user1}
          className="w-full aspect-square rounded  object-cover "
        />
        <img
          src={user2}
          className="w-full aspect-square rounded  object-cover "
        />
        <img
          src={user3}
          className="w-full aspect-square rounded  object-cover "
        />
        <img
          src={user4}
          className="w-full aspect-square rounded  object-cover "
        />
        <img
          src={user5}
          className="w-full aspect-square rounded  object-cover "
        />
      </div>
      <Modal>
        <div className="bg-white w-8/12 mx-auto flex">
          <img src={user1} className="w-5/12 h-[70vh]  object-cover " />
          <div className="w-7/12 p-2">
            <span className="h-10 w-10 ml-auto transform rotate-45 rounded-full bg-gray-100 cursor-pointer   flex items-center justify-center">
              <BsPlus size={32} className="text-gray-600" />
            </span>
            <div>
                <img className="h-5 w-5 rounded-full" src={} />
            </div>
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
}

export default User;
