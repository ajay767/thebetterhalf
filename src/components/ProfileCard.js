import React from "react";

function Profilecard({ profile, name, activeStatus }) {
  return (
    <div className="rounded ring-1 ring-gray-400 p-2 text-gray-800 w-28 flex flex-col space-x-2 flex-shrink-0  ">
      <img
        alt="anjali"
        src={profile}
        className="h-14 w-14 rounded-full object-cover mx-auto"
      />
      <div>
        <p className="text-sm text-center font-medium mb-1">Anjali singh</p>
        <p className="text-xs text-center text-gray-800">Student</p>
      </div>
      <button className="bg-pink-600 text-white text-xs p-2 px-4  mx-auto block rounded-full ">
        Follow
      </button>
    </div>
  );
}

export default ProfileCard;
