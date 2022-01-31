import React from "react";

function Wrapper({ children, className }) {
  return (
    <div
      className={`bg-white min-h-[90vh] shadow h-full rounded   w-full md:w-8/12  lg:w-6/12 mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default Wrapper;
