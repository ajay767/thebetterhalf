import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Wrapper from "@layout/Wrapper";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { user } from "@services";
import { catchError } from "@utils";

function Search() {
  const history = useHistory();
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetching(true);
        const res = await user.searchUser(search);
        console.log(res);
        setList(res.data.data);
      } catch (error) {
        catchError(error);
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [search]);

  return (
    <Wrapper>
      <div className="flex flex-col min-h-screen relative ">
        <div className="flex items-center space-x-2 p-2 bg-slate-50 shadow px-4   ">
          <span
            className="h-10 grid place-content-center cursor-pointer text-gray-700"
            onClick={() => {
              history.goBack();
            }}
          >
            <IoIosArrowBack size={22} />
          </span>
          <div className="text-xs flex-grow">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full bg-transparent outline-none ring-0 border-0 focus:ring-0 focus:border-0"
              placeholder="Search"
            />
          </div>
          <span
            className="h-10 flex-shrink-0 grid place-content-center cursor-pointer text-gray-700"
            onClick={() => {
              history.goBack();
            }}
          >
            <BsSearch size={22} />
          </span>
        </div>
        <div>
          {fetching ? (
            <p className="text-base text-gray-500 text-center my-20">
              Searching..
            </p>
          ) : Boolean(list.length) ? (
            list.map((curr) => (
              <Link to={`/chat/${curr._id}`}>
                <div
                  key={curr._id}
                  className="flex p-2 hover:bg-slate-100  items-center space-x-2"
                >
                  <img
                    alt={curr.username}
                    className="h-10 w-10 rounded-full object-cover"
                    src={curr.profile}
                  />
                  <div>
                    <p className="text-sm">{curr.username}</p>
                    <p className="text-xs">{curr.status}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-base text-gray-500 text-center my-20">
              No user found 🥺
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default Search;
