import React from "react";
import { FriendListCard } from "./index";

import user1 from "@assets/images/p1.jpg";
import user5 from "@assets/images/p5.jpg";
import user2 from "@assets/images/p2.jpg";

function FriendRequest() {
  return (
    <div>
      <FriendListCard name="Shruti Singh" photo={user1} request />
      <FriendListCard name="Anjali Yadav" photo={user5} request />
      <FriendListCard name="Kiran bhadoriya" photo={user2} verified request />
    </div>
  );
}

export default FriendRequest;
