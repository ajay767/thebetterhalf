import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@front/Header";
import Wrapper from "@layout/Wrapper";
import { friend } from "@services";
import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p2.jpg";
import user3 from "@assets/images/p3.jpg";
import user4 from "@assets/images/p4.jpg";
import user5 from "@assets/images/p5.jpg";
import moment from "moment";

function Chatcard({ profile, name, activeStatus, id }) {
  return (
    <Link to={`/chat/${id}`}>
      <div className="flex items-center space-x-2  mb-3 cursor-pointer">
        <img
          src={profile}
          alt="Anamika"
          className="h-12 w-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="text-sm flex-grow w-full overflow-hidden">
          <p className="font-semibold flex justify-between ">
            {name}
            <span className="text-gray-500 text-xs">{activeStatus}</span>
          </p>
          <p className="text-sm truncate  ">
            Hey how are you ? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Rem, enim quibusdam odit tempora officiis optio vel
            exercitationem dolor qui! Beatae commodi praesentium velit enim
            possimus, alias magni nihil nam corporis!
          </p>
        </div>
      </div>
    </Link>
  );
}

function Chat() {
  const [list, setList] = useState([]);

  async function fetchFriend() {
    try {
      const res = await friend.getFriends();
      console.log(res);
      if (res.data.status) {
        setList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFriend();
  }, []);
  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <div className="">
        <h2 className="text-base font-medium mb-4">Recent Messages</h2>
        {list.map((curr) => (
          <Chatcard
            key={curr}
            id={curr._id}
            activeStatus={moment(curr.createdAt).fromNow()}
            name={curr.username}
            profile={curr.profile}
          />
        ))}
        {!Boolean(list.length) && (
          <div className="my-16 ">
            <p className="text-sm text-gray-400 text-center ">
              Let's connect with your friends
            </p>
            <Link
              to="/friends"
              className="text-sm rounded-md bg-pink-600 block w-max mx-auto my-4 text-white p-2 px-4"
            >
              Friends
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default Chat;
