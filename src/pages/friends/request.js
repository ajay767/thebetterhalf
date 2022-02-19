import React, { useEffect, useState } from "react";
import { FriendListCard } from "./index";
import { friend } from "@services";
import { catchError } from "@utils";
import user1 from "@assets/images/p1.jpg";
import user5 from "@assets/images/p5.jpg";
import user2 from "@assets/images/p2.jpg";

function FriendRequest() {
  const [list, setList] = useState([]);
  const [requesting, setRequesting] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAcceptRequest = async (id) => {
    try {
      const { data } = await friend.acceptRequest(id);
      console.log(data, "accepted");
    } catch (error) {
      catchError(error);
    } finally {
      setRefreshKey((e) => e + 1);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const { data } = await friend.deleteRequest(id);
      console.log(data, "accepted");
    } catch (error) {
      catchError(error);
    } finally {
      setRefreshKey((e) => e + 1);
    }
  };

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const { data } = await friend.getFriendRequest();
        console.log(data);
        if (data.status) {
          setList(data.data);
        }
      } catch (error) {
        catchError(error);
      } finally {
        setRequesting(false);
      }
    };
    fetchFriendRequest();
  }, [refreshKey]);

  return (
    <div>
      {requesting && <p className="text-center my-4 ">Loading...</p>}
      {list.map((curr) => (
        <FriendListCard
          handleAcceptRequest={handleAcceptRequest}
          handleDeleteRequest={handleDeleteRequest}
          key={curr._id}
          user={curr}
          request
        />
      ))}
    </div>
  );
}

export default FriendRequest;
