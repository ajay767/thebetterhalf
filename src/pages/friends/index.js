import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import Wrapper from "@layout/Wrapper";
import Header from "@front/Header";
import user2 from "@assets/images/p2.jpg";
import user4 from "@assets/images/p4.jpg";
import user3 from "@assets/images/p3.jpg";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { friend } from "@services";
import { catchError } from "@utils";
import FriendRequest from "./request";

export function FriendListCard({
  name,
  verified,
  photo,
  request = false,
  user,
  handleDeleteRequest,
  handleAcceptRequest,
}) {
  return (
    <Link to={`/user/${user._id}`}>
      <div className="mb-2 flex space-x-2 items-stretch">
        <img
          className="w-12 h-12  rounded-md  object-cover"
          src={user.profile}
          alt="user"
        />
        <div className="text-sm ">
          <h4 className="font-medium flex items-center  ">
            {user.username}{" "}
            {verified && (
              <span className="text-pink-600 ml-2 ">
                <IoCheckmarkDoneCircle size={24} />
              </span>
            )}
          </h4>
          <p>{user.status}</p>
        </div>
        {request && (
          <div className="ml-auto flex space-x-2 items-center r">
            <p
              onClick={() => handleAcceptRequest(user._id)}
              className="p-2 hover:bg-pink-600 hover:text-white cursor-pointer  ring-1 ring-pink-600 text-xs rounded-full"
            >
              <GiCheckMark size={16} />
            </p>
            <p
              onClick={() => handleDeleteRequest(user._id)}
              className="p-2 hover:bg-pink-600 hover:text-white cursor-pointer  ring-1 ring-pink-600 text-xs rounded-full"
            >
              <BsPlusLg size={16} className="transform rotate-45 " />
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

function FriendList() {
  const [list, setList] = useState([]);
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await friend.getFriends();
        if (data.status) {
          setList(data.data);
        }
      } catch (error) {
        catchError(error);
      } finally {
        setRequesting(false);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div>
      {requesting && <p className="text-center my-4 ">Loading...</p>}

      {list.map((curr) => (
        <FriendListCard key={curr._id} user={curr} />
      ))}
    </div>
  );
}

function Friends() {
  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <div className="flex text-sm  mb-2">
        <NavLink
          exact
          activeClassName="border-b-2 border-pink-600"
          className="block w-6/12"
          to="/friends"
        >
          <div className="p-2 px-4  text-center cursor-pointer   ">Friends</div>
        </NavLink>
        <NavLink
          exact
          className="block w-6/12"
          to="/friends/request"
          activeClassName="border-b-2 border-pink-600"
        >
          <div className="p-2 px-4  text-center cursor-pointer   ">Request</div>
        </NavLink>
      </div>
      <Switch>
        <Route exact path="/friends" component={FriendList} />
        <Route exact path="/friends/request" component={FriendRequest} />
      </Switch>
    </Wrapper>
  );
}

export default Friends;
