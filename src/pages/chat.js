import React from "react";
import { Link } from "react-router-dom";
import Header from "@front/Header";
import Wrapper from "@layout/Wrapper";

import user1 from "@assets/images/p1.jpg";
import user2 from "@assets/images/p2.jpg";
import user3 from "@assets/images/p3.jpg";
import user4 from "@assets/images/p4.jpg";
import user5 from "@assets/images/p5.jpg";

function Chatcard({ profile, name, activeStatus }) {
  return (
    <Link to="/chat/TZ5346">
      <div className="flex items-center gap-2 mb-3 cursor-pointer">
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
  return (
    <Wrapper className="py-4 p-4">
      <Header />
      <div className="">
        <h2 className="text-base font-medium mb-4">Recent Messages</h2>
        <Chatcard
          activeStatus={"Active 1 hr ago"}
          name="Anamika Singh"
          profile={user1}
        />
        <Chatcard
          activeStatus={"Active 45min ago"}
          name="Ruchi Singh"
          profile={user2}
        />
        <Chatcard
          activeStatus={"Active now"}
          name="Shristy Yadav"
          profile={user3}
        />
        <Chatcard
          activeStatus={"Active 1.3 hr ago"}
          name="Ajay Yadav"
          profile={user4}
        />
        <Chatcard
          activeStatus={"Active 45min ago"}
          name="Ruchi Singh"
          profile={user2}
        />
        <Chatcard
          activeStatus={"Active 45min ago"}
          name="Aradhna Yadav"
          profile={user5}
        />
        <Chatcard
          activeStatus={"Active now"}
          name="Shristy Yadav"
          profile={user3}
        />{" "}
        <Chatcard
          activeStatus={"Active 45min ago"}
          name="Ruchi Singh"
          profile={user2}
        />
        <Chatcard
          activeStatus={"Active now"}
          name="Shristy Yadav"
          profile={user3}
        />
        <Chatcard
          activeStatus={"Active 1.3 hr ago"}
          name="Ajay Yadav"
          profile={user4}
        />
      </div>
    </Wrapper>
  );
}

export default Chat;
